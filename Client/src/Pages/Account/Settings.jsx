import React, { useContext, useEffect, useState } from "react";
import Full from "./../../Components/Images/full.png";
import { AuthContext } from "../../AuthContext";

export const Settings = () => {
	const [userData, setUserData] = useState({});

	const { getUserData, logout } = useContext(AuthContext);

	useEffect(() => {
		(async () => {
			setUserData((await getUserData()) ?? {});
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div id="settingsContainer">
			<img
				src={Full}
				id="settingBear"
				alt="Logo: Cute Brown Bear with heart on chest."
			/>
			<div id="settingsTextContainer">
				<h2 id="settingsHeader">Settings</h2>
				<div id="personalInfo">
					<p className="userInfoDisplay">
						First Name: {userData.firstName}
					</p>
					<p className="userInfoDisplay">
						Last Name: {userData.lastName}
					</p>
					<p className="userInfoDisplay">Email: {userData.email}</p>
				</div>
				<button id="logoutButton" onClick={logout}>
					Log Out
				</button>
			</div>
		</div>
	);
};

export default Settings;
