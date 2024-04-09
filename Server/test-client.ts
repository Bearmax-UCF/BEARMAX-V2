import { Json } from "mailgun.js";
import { io } from "socket.io-client";

console.log("Attempting to connect");

/*
bearmaxcare.com

const TOKEN =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjBkYWQ2MmNhYjNiMTEyMTY4NjkyMTMiLCJqdGkiOiIyYTQxYjQ0Zi1jNWNlLTQ4ZDUtOTQwYy0yOGE1MjE1MzIxMDMiLCJpYXQiOjE3MTI2Nzg0NjMsImV4cCI6MTcxMjcyMTY2M30.PJ6NeYNWSYCq7td0KHXC8IPwVOR0U4inKrkIRUstF-Y"
const USERID = "660dad62cab3b11216869213";
const URL = "https://bearmaxcare.com";
*/

/*
dev
*/
const TOKEN =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjE1NWQxOWNiNzM1ZGEwNGY1MGY2YmIiLCJqdGkiOiJiN2VhMGNhZC03ZjAyLTRlODAtYmE1Yi1jZDAwOThkYzcxNDgiLCJpYXQiOjE3MTI2NzYxNTEsImV4cCI6MTcxMjcxOTM1MX0.js6ciGKOpA6xLGpIfBxUcfCGcLpXGLP_Y-h4xN2OoRM";
const USERID = "66155d19cb735da04f50f6bb";
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
	//socket.emit("playMedia", JSON.stringify({ mediaName: "Metal_pipe_falling_sound_effectloud.mp4", videoBool: true, audioBool: false }), { userID: USERID });
	socket.emit("playMedia", JSON.stringify({ mediaName: "Metal_pipe_falling_sound_effectloud.mp4", videoBool: true, audioBool: true }), { userID: USERID });
	//socket.emit("playMedia", JSON.stringify({ mediaName: "Metal_pipe_falling_sound_effect_but_its_more_violent.mp3", videoBool: false, audioBool: true }), { userID: USERID });
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

socket.on("playMedia", (blobSasUrl: string, videoBool: boolean, audioBool: boolean) => {
	console.log("Received playMedia event with data: " + blobSasUrl + ", videoBool: " + videoBool + ", and audioBool: " + audioBool);
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
