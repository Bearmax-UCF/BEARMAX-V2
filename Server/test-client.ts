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
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjBkYTI3YTY2YTUxZTQ1YzIwMTA1NGIiLCJqdGkiOiJmZGFmYjZmNS05M2Y4LTQ2NDAtODBjZS0xNjkwOGYzZGJhNmEiLCJpYXQiOjE3MTIxNjk2NDMsImV4cCI6MTcxMjIxMjg0M30.ioGCYqJ0wVnQgVlN86_KqRyrfY7pZjdDIQlhQpwgkIc";
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
	socket.emit("emotionGameStats", JSON.stringify({ Correct: [0, 0, 0, 0], Wrong: [0, 0, 0, 0], GameFin: new Date(), UserID: USERID, NumPlays: 1 }));
	socket.emit("recalibrate");
	socket.emit("GSR", JSON.stringify({ value: 450, ts: new Date() }));
	socket.emit("playMedia", JSON.stringify({ mediaURL: "Metal_pipe_falling_sound_effectloud.mp4" }), { userID: USERID });
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
