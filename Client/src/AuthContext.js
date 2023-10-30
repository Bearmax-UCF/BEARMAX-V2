import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { buildPath } from "./Components/BuildPath";

export const AuthContext = createContext({});

function validUser(userData) {
	return (
		userData &&
		typeof userData.id === "string" &&
		typeof userData.token === "string"
	);
}

function saveUser(userData) {
	if (validUser(userData)) {
		localStorage.setItem("id", userData.id);
		localStorage.setItem("token", userData.token);
		localStorage.setItem(
			"tokenExpiry",
			"" + (new Date().getTime() + 1000 * 60 * 60 * 12)
		);
	}
}

function clearUser() {
	localStorage.setItem("id", "");
	localStorage.setItem("token", "");
	localStorage.setItem("tokenExpiry", "");
}

function getUser() {
	const id = localStorage.getItem("id");
	const token = localStorage.getItem("token");
	const expiry = localStorage.getItem("tokenExpiry");
	if (!id || !token) return null;
	if (expiry <= new Date().getTime()) {
		clearUser();
		return null;
	}
	return {
		id,
		token,
	};
}

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const navigate = useNavigate();

	const loginFunction = async (email, password) => {
		try {
			const res = await fetch(buildPath("/api/auth/login"), {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			if (res.status === 200) {
				const data = await res.json();
				const userData = { token: data.token, id: data.id };
				setUser(userData);
				saveUser(userData);
				return "";
			}
		} catch (err) {
			console.error(err);
		}
		return "Invalid email or password!";
	};

	const signupFunction = async (email, firstName, lastName, password) => {
		try {
			const res = await fetch(buildPath("/api/auth/register"), {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					firstName,
					lastName,
					password,
				}),
			});
			if (res.status === 201) return "";
		} catch (err) {
			console.error(err);
		}
		return "Signup failed!";
	};

	const logoutFunction = async () => {
		if (!user) return "User not logged in!";

		try {
			const res = await fetch(buildPath("/api/auth/logout"), {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: "Bearer " + user.token,
				},
			});

			if (res.status === 200) {
				setUser(null);
				clearUser();
				return "";
			}
		} catch (err) {
			console.error(err);
		}
		return "Logout failed!";
	};

	const getUserData = async (token) => {
		if (!token && !user) return null;
		try {
			const res = await fetch(buildPath("/api/users/me"), {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: "Bearer " + (token ?? user.token),
				},
			});

			if (res.status === 200) {
				const data = await res.json();
				return data.me;
			}
		} catch (err) {
			console.error(err);
		}
		return null;
	};

	useEffect(() => {
		async function testToken() {
			// Get from store
			const userData = getUser();
			if (userData) {
				// Check if token has not expired
				const tokenIsValid =
					(await getUserData(userData.token)) !== null;
				if (tokenIsValid) {
					setUser(userData);
					navigate("/dashboard");
				} else {
					clearUser();
				}
			}
		}
		testToken();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				login: loginFunction,
				logout: logoutFunction,
				signup: signupFunction,
				getUserData,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
