import React from "react";
import Bear from "./../../Components/Images/full.png";

export const AboutUs = () => {
	return (
		<div>
			<img
				src={Bear}
				className="aboutBear"
				alt="Design of bearmax, brown simple bear"
			/>
			<h1>About BearMAX</h1>
			<p className="aboutText">
				BEARMAX is a robotic companion that facilitates social-emotional
				learning (SEL) for children with autism. The primary function of
				the robot is to address sensory overload. BEARMAX detects
				heightened stress levels and environmental triggers for sensory
				overload, then responds automatically with actions to soothe the
				user such as a fist-bump or verbal instructions. BEARMAX also
				gamifies learning to recognize and regulate core emotions like
				happiness, sadness, and anger. Users can interact with and
				control their BEARMAX entirely through our mobile app.
				Additionally, clinicians and guardians can review all collected
				data through our website. Examples of collected data include
				health readings used for stress detection and statistics of the
				user’s performance in the emotion detection game.
			</p>
			<p className="aboutText">
				This project introduces new methods for detecting
				overstimulation not found in other SEL robots. Additionally,
				BEARMAX is designed to be portable and usable in a wide range of
				environments. Our creation allows children with autism to be
				more comfortable in their everyday activities and for clinicians
				or guardians to better assess the child’s growth and response to
				the robot.
			</p>
		</div>
	);
};

export default AboutUs;
