import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import "./Components/NavBar/Nav.css";
import "./Pages/Landing/Landing.css";
import "./Pages/Account/Account.css";
import "./Components/Component.css";
import "./Components/Notes/NotesLayout.css";

import NavBar from "./Components/NavBar/NavBar";

import LandingPage from "./Pages/Landing/LandingPage";
import AboutUs from "./Pages/Landing/AboutUs";
import ContactUs from "./Pages/Landing/ContactUs";

import Dashboard from "./Pages/Account/Dashboard";
import AllNotes from "./Pages/Account/AllNotes";
import HowToUse from "./Pages/Account/HowToUse";
import Settings from "./Pages/Account/Settings";

import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import { AuthContext } from "./AuthContext";

import { Navigate } from "react-router-dom";
import EmotionGame from "./Pages/Account/EmotionGame";

const Protected = ({ children }) => {
	const { user } = useContext(AuthContext);

	return !user ? <Navigate to="/login" replace /> : children;
};

function App() {
	return (
		<div className="App">
			<ToastContainer
				position="bottom-center"
				autoClose="4000"
				theme="dark"
			/>
			<NavBar />
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/about-us" element={<AboutUs />} />
				<Route path="/contact-us" element={<ContactUs />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />

				<Route
					path="/dashboard"
					element={
						<Protected>
							<Dashboard />
						</Protected>
					}
				/>
				<Route
					path="/all-notes"
					element={
						<Protected>
							<AllNotes />
						</Protected>
					}
				/>
				<Route
					path="/emotion-game"
					element={
						<Protected>
							<EmotionGame />
						</Protected>
					}
				/>
				<Route
					path="/how-to-use"
					element={
						<Protected>
							<HowToUse />
						</Protected>
					}
				/>
				<Route
					path="/settings"
					element={
						<Protected>
							<Settings />
						</Protected>
					}
				/>
				<Route
					path="/*"
					element={
						<div id="noRouteContainer">
							<h1 className="noRoute">
								That Page Doesn't Exist!
							</h1>
						</div>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
