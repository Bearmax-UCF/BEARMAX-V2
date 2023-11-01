import type { Server } from "socket.io";
import constants from "../utils/constants";
import { EmotionGameAction, GSRStringData } from "../utils/types";
import EmotionRecognition from "../models/EmotionRecognition";
import passport from "passport";

/** Register socket.io event handlers
 */
export default (io: Server) => {
	// Ensure websocket clients have a valid client certificate
	//   if (constants.isProduction) {
	//     io.engine.on("connection", (rawSocket) => {
	//       const isAuthorized = rawSocket.request.client.authorized;
	//       console.log(`NEW CONNECTION: ${isAuthorized}`);

	// Ensure websocket clients have a valid client certificate
	if (constants.isProduction) {
		io.engine.on("connection", (rawSocket) => {
			const auth_header: String | undefined =
				rawSocket.request.headers.authorization;
			const token = auth_header?.replace("Bearer", "").trim();

			const isAuthorized = rawSocket.request.client.authorized;

			if (!isAuthorized && token === undefined) {
				const err = new Error("not authorized");
				(err as Error & { data: { content: string } }).data = {
					content:
						"Not Authorized, invalid or missing client certificate.",
				};
				rawSocket.emit("connect_error", err);
				rawSocket.close();
			} else if (!isAuthorized && token) {
				passport.authenticate("jwt", { session: false }, (e, user) => {
					if (!user) {
						const err = new Error("not authorized");
						(err as Error & { data: { content: string } }).data = {
							content:
								"Not Authorized, invalid or missing client certificate.",
						};
						rawSocket.emit("connect_error", err);
						rawSocket.close();
					} else {
						rawSocket.request.client.user = user;
					}
				})(rawSocket.request, {}, () => {});
			}
		});
	}

	/*
  Events:

    Server listening:
    - 'speak': ROS sending message for mobile app to caption
        - Args: message (string)
    - 'emotionGame': Mobile app sending message to control start/stopping the emotion game
        - Args: action ("start" or "stop")
    - 'recalibrate': Mobile app sending request for camera and sensors to recalibrate
        - Args: none
      - 'emotionGameStats': ROS is sending back stats about what they got right/wrong in JSON format, save to DB
        - Args: string

    Client Listening (ROS or Mobile)
    - 'speak': Server sends message to mobile to caption message
        - Args: message (string)
    - 'emotionGame': ROS listening for start/stop updates to the emotion game
        - Args: action ("start" or "stop")
    - 'recalibrate': ROS listening for requests to recalibrate camera and sensors 
        - Args: none
  */

	io.on("connection", (socket) => {
		console.log(
			"New connection " +
				socket.id +
				" with userID " +
				socket.handshake.query.userID
		);

		socket.on("ping", () => io.emit("Pong!"));

		// Forward to mobile
		socket.on("speak", (message: string) => {
			console.log(
				new Date() +
					" || Received speak event with message '" +
					message +
					"'"
			);
			io.emit("speak", message);
		});

		// Forward to ROS
		socket.on("emotionGame", (action: EmotionGameAction) => {
			const senderID = socket.handshake.query.userID;
			if (!senderID) {
				console.log(
					"Error: Game started by a socket without a userID query parameter."
				);
				return;
			}

			console.log(
				new Date() +
					" || Received emotionGame event with action '" +
					action +
					"'"
			);
			io.emit("emotionGame", action, senderID);
		});

		// Forward to ROS
		socket.on("recalibrate", () => {
			console.log(new Date() + " || Received recalibrate event");
			io.emit("recalibrate");
		});

		// Emotion game was successfully stopped and is passing back data
		socket.on("emotionGameStats", (statsJSON: string) => {
			console.log(new Date() + " || Received emotionGameStats event");
			const statsRaw = JSON.parse(statsJSON);
			console.log(statsRaw);
			console.log(typeof statsRaw.GameFin);

			if (!statsRaw) {
				console.log(
					"Failed to save Emotion Game stats - UserID in return was undefined or empty"
				);
				return;
			}

			if (!statsRaw.UserID) {
				console.log(
					"Could not save emotion game stats because UserID property not found:\n",
					statsRaw
				);
				return;
			}

			const finishedGame = new EmotionRecognition({
				Correct: statsRaw.Correct ?? [0, 0, 0, 0],
				Wrong: statsRaw.Wrong ?? [0, 0, 0, 0],
				NumPlays: statsRaw.NumPlays ?? 0,
				GameFin: new Date(statsRaw.GameFin) ?? new Date(),
				UserID: statsRaw.UserID,
			});

			finishedGame.save((err) => {
				if (err) console.error(err);
				else console.log("Successfully saved event!");
			});
		});

		socket.on("GSR", (gsrString: string) => {
			const data: GSRStringData = JSON.parse(gsrString);
			io.emit("GSR", data.value, data.ts);
		});

		socket.on("disconnecting", (reason) => {
			console.log(`disconnecting ${socket.id}: ${reason}`);
		});
	});
};
