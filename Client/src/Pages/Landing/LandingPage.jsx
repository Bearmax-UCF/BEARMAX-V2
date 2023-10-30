import React from "react";
import { useNavigate } from "react-router-dom";

import Logo from "./../../Components/Images/face.png";

export const LandingPage = () => {
	const navigate = useNavigate();

	return (
		<div className="landing">
			<img src={Logo} className="landingLogo" alt="Logo: bear max face" />

			<h2>A dashboard made with care, for care</h2>

			<br></br>
			<button
				className="landingButton"
				onClick={() => navigate("/login")}
			>
				Login
			</button>
			<br></br>
			<button
				className="landingButton"
				onClick={() => navigate("/register")}
			>
				Register For an Account
			</button>
		</div>
	);
};

export default LandingPage;
