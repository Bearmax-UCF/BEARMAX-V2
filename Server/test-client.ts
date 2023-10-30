import { io } from "socket.io-client";

console.log("Attempting to connect");

/*
carewithbearmax.com

const TOKEN =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDM3MDc1ZmY2MjQ4MjgzMDJlZTMwNjciLCJqdGkiOiI0YWY0ZDk0ZS01YWVkLTRkMzItYTQyNy1jYTU1ZjIwZTNmOTkiLCJpYXQiOjE2ODE5MjY2OTksImV4cCI6MTY4MTk2OTg5OX0.bjL-tptKMTK8i8ag7nxVz2NWpgDf3knQOuYqbK21Jc8";
const USERID = "6437075ff624828302ee3067";
const URL = "https://carewithbearmax.com";
*/

/*
dev
*/
const TOKEN =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDQxZTk3OGZkMzQ0MDg5OGZkYTRmYzkiLCJqdGkiOiI2N2FhYTMyNi1jN2Q0LTQ5M2ItYTY3Mi0wZTA1ZGMyYTBkOTIiLCJpYXQiOjE2ODIwNDEyMTQsImV4cCI6MTY4MjA4NDQxNH0.WFas6RYYqVyn0U2PAD0GjwbWy9dK8T2AiU9Tm_3WTKc";
const USERID = "6441e978fd3440898fda4fc9";
const URL = "http://localhost:8080";

// @ts-ignore
const socket = io(URL, {
	query: {
		userID: USERID,
	},
	extraHeaders: {
		Authorization: "Bearer " + TOKEN,
	},
});

const getNextVal = (lastVal: number) => {
	const newVal = Math.max(0, Math.random() * 10 - 5 + lastVal);
	return newVal;
};

socket.on("connect", () => {
	console.log("Client connected!");

	let last = 450;
	setInterval(() => {
		// console.log("Sending!");
		last = getNextVal(last);
		socket.emit("GSR", JSON.stringify({ value: last, ts: new Date() }));
	}, 71);
});

socket.on("disconnect", () => {
	console.log("disconnected!");
});
