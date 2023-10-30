import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "./Images/face.png";
import { AuthContext } from "../AuthContext";
import { toast } from "react-toastify";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();
	const { login } = useContext(AuthContext);

	const doLogin = async (event) => {
		event.preventDefault();

		if (!email || !password) {
			toast.error("Invalid login.");
			return;
		}

		const errorMsg = await login(email, password);
		if (!errorMsg) navigate("/dashboard");
		else toast.error("Invalid login.");
	};

	return (
		<div>
			<img src={Logo} className="loginLogo" alt="Logo: bear max face" />

			<form onSubmit={doLogin}>
				<input
					type="text"
					className="loginText"
					id="loginEmail"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					className="loginText"
					id="loginPassword"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit" className="loginButton" onClick={doLogin}>
					Login
				</button>
				<br />
			</form>
			<button className="logToReg" onClick={() => navigate("/register")}>
				<u>Don't have an account? Register now!</u>
			</button>
		</div>
	);
}

export default Login;
