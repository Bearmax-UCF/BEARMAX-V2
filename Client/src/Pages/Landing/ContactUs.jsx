import React from "react";

const leftTeam = [
	{
		name: "Rachel Biesiedzinski",
		major: "Computer Science",
		role: "Full-Stack",
		imgSrc: "/headshots/Rachel.jpg",
	},
	{
		name: "Geela Margo Ramos",
		major: "Computer Science",
		role: "Stress Detection",
		imgSrc: "/headshots/Geela.jpg",
	},
	{
		name: "Simon Weizman",
		major: "Computer Science",
		role: "Robot Controls",
		imgSrc: "/headshots/Simon.jpg",
	},
];
const rightTeam = [
	{
		name: "Elijah Smith",
		major: "Computer Science",
		role: "Emotion Recognition Game",
		imgSrc: "/headshots/Eli.jpg",
	},
	{
		name: "Eric Frankle",
		major: "Mechanical Engineering",
		role: "Robot Construction",
		imgSrc: "/headshots/Eric.jpg",
	},
	{
		name: "Alvaro Aracena",
		major: "Mechanical Engineering",
		role: "Robot Construction",
		imgSrc: "/headshots/Alvaro.jpg",
	},
];

const renderMember = (member) => {
	return (
		<div className="memberContainer">
			<img
				src={member.imgSrc}
				className="memberImage"
				alt="Logo: bear max face"
			/>
			<div className="memberTextContainer">
				<p className="memberName">{member.name}</p>
				<p className="memberMajor">Major: {member.major}</p>
				<p className="memberRole">Role: {member.role}</p>
			</div>
		</div>
	);
};

export const ContactUs = () => {
	return (
		<div>
			<div className="contact">
				<h1>Contact Us</h1>
				<p> Email: BearMaxTeam@BearMax.com</p>
				<p> Call: 1-800-BEAR-MAX</p>
			</div>

			<h1 id="meetTeamHeader">Meet The Team</h1>
			<div id="meetTeam">
				<div id="leftMembers">
					{leftTeam.map((member) => renderMember(member))}
				</div>
				<div id="rightMembers">
					{rightTeam.map((member) => renderMember(member))}
				</div>
			</div>
		</div>
	);
};

export default ContactUs;
