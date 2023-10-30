import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "./Images/face.png";
import { AuthContext } from "../AuthContext";
import { toast } from "react-toastify";

function Register() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const navigate = useNavigate();
	const { signup } = useContext(AuthContext);

	const registerUser = async (event) => {
		event.preventDefault();

		if (
			firstName === "" ||
			lastName === "" ||
			email === "" ||
			password === "" ||
			confirmPassword === ""
		) {
			toast.error("Please make sure all fields are filled!", {
				autoClose: 5000,
			});
			return;
		} else if (password !== confirmPassword) {
			toast.error("Passwords don't match!");
			return;
		} else {
			const errorMsg = await signup(email, firstName, lastName, password);
			if (!errorMsg) {
				toast.success("Success! Please log in.");
				navigate("/login");
			} else {
				toast.error(errorMsg);
			}
		}
	};

	return (
		<div className="Register">
			<img src={Logo} className="regLogo" alt="Logo: bear max face" />

			<form onSubmit={registerUser}>
				<input
					type="text"
					className="regText"
					placeholder="First Name"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
				/>
				<br />
				<input
					type="text"
					placeholder="Last Name"
					className="regText"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
				/>
				<br />
				<input
					type="email"
					placeholder="email@bearmax.com"
					className="regText"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<br />
				<input
					type="password"
					placeholder="Password"
					className="regText"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<br />
				<input
					type="password"
					placeholder="Retype Password"
					className="regText"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				<br />
				<input
					className="regButton"
					type="submit"
					value="Register"
					onClick={registerUser}
				/>
				<br />
			</form>
			<button className="regToLog" onClick={() => navigate("/login")}>
				<u>Already have an account? Login!</u>
			</button>
		</div>
	);
}

export default Register;
