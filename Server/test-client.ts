import { Json } from "mailgun.js";
import { io } from "socket.io-client";

console.log("Attempting to connect");

/*
bearmaxcare.com

const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjBkYWQ2MmNhYjNiMTEyMTY4NjkyMTMiLCJqdGkiOiJiYjU1NmUyZS1lMjZiLTQ5MzEtOTA4Yi1jODUyZDM5MGU3YmMiLCJpYXQiOjE3MTIzNTEwOTUsImV4cCI6MTcxMjM5NDI5NX0.3zDFT0cXrTzBGH8RiVRjpJ8lMkJnMllw6Pl1xvRXHko"
const USERID = "660dad62cab3b11216869213";
const URL = "https://bearmaxcare.com";
*/

/*
dev
*/
const TOKEN =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjBkYTI3YTY2YTUxZTQ1YzIwMTA1NGIiLCJqdGkiOiI0ZGUzOTk5Ny1lOTdiLTQ5MDgtYTBjOC0xOTZjNGVhMTI4NzUiLCJpYXQiOjE3MTI1MzAzNzksImV4cCI6MTcxMjU3MzU3OX0.H1s1s-zswxR9l3vZ2BPBTopV6T92zQsaic0aVNxjprw";
const USERID = "660da27a66a51e45c201054b";
const URL = "http://localhost:8080";


// @ts-ignore
const socket = io(URL, {
	query: {
		userID: USERID,
	},
	extraHeaders: {
		Authorization: "Bearer " + TOKEN,
	},
	transports: ["polling", "websocket"],
});

const getNextVal = (lastVal: number) => {
	const newVal = Math.max(0, Math.random() * 10 - 5 + lastVal);
	return newVal;
};

socket.on("connect", () => {
	console.log("Client connected!");
	
	/*
	let last = 450;
	setInterval(() => {
		// console.log("Sending!");
		last = getNextVal(last);
		socket.emit("GSR", JSON.stringify({ value: last, ts: new Date() }));
		console.log(socket);
	}, 71);
	*/

	socket.emit("ping");
	socket.emit("speak", "Hello from the client!");
	socket.emit("emotionGame", "start", { userID: USERID });
	socket.emit("emotionGame", "stop", { userID: USERID });
	socket.emit("recalibrate");
	socket.emit("GSR", JSON.stringify({ value: 450, ts: new Date() }));
	//socket.emit("playMedia", JSON.stringify({ mediaURL: "Metal_pipe_falling_sound_effectloud.mp4" }), true, false, { userID: USERID });
	socket.emit("playMedia", JSON.stringify({ mediaURL: "Metal_pipe_falling_sound_effectloud.mp4" }), true, true, { userID: USERID });
	//socket.emit("playMedia", JSON.stringify({ mediaURL: "Metal_pipe_falling_sound_effect_but_its_more_violent.mp3" }), false, true, { userID: USERID });
});


socket.on("Pong!", () => {
	console.log("Pong received!");
})

socket.on("speak", (msg: string) => {
	console.log('Message: ' + msg);
});

socket.on("emotionGame", (action: string, senderID: string) => {
	console.log("Received emotionGame event with action '" + action + "' from senderID: " + senderID);
});

socket.on("recalibrate", () => {
	console.log("Received recalibrate event");
});

socket.on("GSR", (dataValue:string, dataTS:string) => {
	console.log("Received GSR event with data: " + dataValue + " at " + dataTS);
});

socket.on("playMedia", (blobSasUrl: string) => {
	console.log("Received playMedia event with data: " + JSON.stringify(blobSasUrl));
});

socket.on("disconnect", () => {
	console.log("disconnected!");
});

socket.on("GSR", (data: string, date: string) => {
	console.log("Received GSR data: " + data + date);
});

socket.on("connect_error", () => {
	console.log("Connection error!");
})