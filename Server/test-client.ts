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
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjA2ZWE4NTlhNWY1YjU5ODU2ZmUzNDgiLCJqdGkiOiJmZmM1MmY4Ni0yNjQyLTQ2MTMtYmJiOS0wMTQzZDhiZmVkM2QiLCJpYXQiOjE3MTE5MDM3NDIsImV4cCI6MTcxMTk0Njk0Mn0.HikEJJXiQZtaosp5Yi3Y1xkOkiElPXo7Z2KMWJNWVGY";
const USERID = "6606ea859a5f5b59856fe348";
const URL = "https://bearmaxcare.com/";

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
