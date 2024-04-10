import { Json } from "mailgun.js";
import { io } from "socket.io-client";

console.log("Attempting to connect");

/*
bearmaxcare.com

const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjA5OWI0OTZmZWEzMDRhNGNlMWFmOGEiLCJqdGkiOiI4MmNmZjUzNC0wM2FlLTQ2NjYtOThhYi04MjVkYzg0Y2EwMjkiLCJpYXQiOjE3MTE5MDU2NDEsImV4cCI6MTcxMTk0ODg0MX0.ca7svHbBnquHX2hRsYpD_lrd3enCHuDH-7E3cpML8Q8"
const USERID = "66099b496fea304a4ce1af8a";
const URL = "https://bearmaxcare.com";
*/

/*
dev
*/
const TOKEN =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjE1NzM3OWFjODA3YjIyYzAzN2ZkNzEiLCJqdGkiOiIyYjlkZjIxMi0wZGFhLTQ1ZTktYWQ4Ni0zNzBiM2I5MDA5ZDUiLCJpYXQiOjE3MTI2ODE4ODUsImV4cCI6MTcxMjcyNTA4NX0.8zBJ-gcLk-jNRVHfzmKfT08A-H3tKPro9cnJocizIKI";
const USERID = "66157379ac807b22c037fd71";
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
	socket.emit("playMedia", JSON.stringify({ mediaName: "Metal_pipe_falling_sound_effectloud.mp4", videoBool: true, audioBool: false }), { userID: USERID });
	//socket.emit("playMedia", JSON.stringify({ mediaName: "Metal_pipe_falling_sound_effectloud.mp4", videoBool: true, audioBool: true }), { userID: USERID });
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