import type { Server } from "socket.io";
import { BlockBlobClient, StorageSharedKeyCredential, BlobServiceClient, generateBlobSASQueryParameters, BlobSASPermissions } from "@azure/storage-blob";
import constants from "../utils/constants";
import { EmotionGameAction, GSRStringData, BlobStringData } from "../utils/types";
import EmotionRecognition from "../models/EmotionRecognition";
import User from "../models/User";
import passport from "passport";

const cutStringQuote = (rawConnectionString: string) => {
	return (rawConnectionString.charAt(0) === '"' && rawConnectionString.charAt(rawConnectionString.length - 1)) ? 
	rawConnectionString.substring(1, rawConnectionString.length - 1) : 
	rawConnectionString;
}

const connectionString = cutStringQuote(constants.azure_connection_string);

/** Register socket.io event handlers
 */
export default (io: Server) => {
	// Ensure websocket clients have a valid client certificate
	//   if (constants.isProduction) {
	//     io.engine.on("connection", (rawSocket) => {
	//       const isAuthorized = rawSocket.request.client.authorized;
	//       console.log(`NEW CONNECTION: ${isAuthorized}`);

	// Ensure websocket clients have a valid client certificate
	/*
	if (constants.isProduction) {
		io.engine.on("connection", (rawSocket: any) => {
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
				passport.authenticate("jwt", { session: false }, (e: any, user: any) => {
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
	*/
	
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
	- 'playMedia': Mobile app sending request for Raspberry Pi to play media
		- Args: string (user-selected azure blob name)

    Client Listening (ROS or Mobile)
    - 'speak': Server sends message to mobile to caption message
        - Args: message (string)
    - 'emotionGame': ROS listening for start/stop updates to the emotion game
        - Args: action ("start" or "stop")
    - 'recalibrate': ROS listening for requests to recalibrate camera and sensors 
        - Args: none
	- 'playMedia': Raspberry Pi listening for media updates for the sensory overload aid
  */
	io.on("connection_error", (err) => {
		console.log(err.req);      // the request object
  		console.log(err.code);     // the error code, for example 1
  		console.log(err.message);  // the error message, for example "Session ID unknown"
  		console.log(err.context);  // some additional error context
	});
	io.on("connection", (socket) => {
		console.log(
			"New connection " +
				socket.id +
				" with userID " +
				socket.handshake.query.userID
		);

		socket.on("ping", () => {
			console.log("Received ping event");
			io.emit("Pong!");
		});

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

		// User selected a media to play from Azure database via mobile app, 
			// so transferring URL of media to Raspberry Pi
		socket.on("playMedia", async (blobStringData: string) => {
			const data: BlobStringData = JSON.parse(blobStringData);
			const blobName = data.mediaURL;

			const userId = socket.handshake.query.userID;
			if (!userId) {
				console.log("User id is not present");
				return;
			}
			const user = await User.findById(userId);
			if (!user) {
				console.log("User not found");
				return;
			}

			// Create container name based on the user
			const blobContainerName = userId.toString();
			const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

			const containerClient = blobServiceClient.getContainerClient(blobContainerName);

			const boolContainer = await containerClient.exists();
			if(!boolContainer) {
				console.log("Container does not exists.");
				return;
			}

			const blockBlobClient = containerClient.getBlockBlobClient(blobName);

			const blobExists = await blockBlobClient.exists();
			if (!blobExists) {
				console.log("Blob not found");
				return;
			}

			const response = await blockBlobClient.getProperties();

			const blobSasUrl = await getBlobSasURL(blobContainerName, blobName, blockBlobClient);

			if(response.errorCode) {
				console.log("Error getting blob");
				return;
			} else {
				console.log("Blob received successfully");
				io.emit("playMedia", blobSasUrl);
			}
		});

		socket.on("GSR", (gsrString: string) => {
			const data: GSRStringData = JSON.parse(gsrString);
			io.emit("GSR", data.value, data.ts);
			console.log("GSR data sent to client");
		});

		socket.on("disconnecting", (reason) => {
			console.log(`disconnecting ${socket.id}: ${reason}`);
		});
	});
};


async function getBlobSasURL(containerName: string, blobName: string, blockBlobClient: BlockBlobClient): Promise<string> {
    const sharedKeyCredential = new StorageSharedKeyCredential(constants.azure_storage_account, constants.azure_account_key);
    const startTime = new Date();
    const durationInMinutes = 15;
    startTime.setMinutes(startTime.getMinutes() - durationInMinutes);

    const blobSas = await generateBlobSASQueryParameters({
        containerName, // Required
        blobName, // Required
        permissions: BlobSASPermissions.parse("r"), // Required
        startsOn: startTime, // Optional
        expiresOn: new Date(new Date().valueOf() + 60 * 60 * 1000), // Required. Date type. Set for 1 hours
      },
      sharedKeyCredential // StorageSharedKeyCredential - `new StorageSharedKeyCredential(account, accountKey)`
    )

    const blobSasUrl = blockBlobClient.url + "?" + blobSas.toString();

    return blobSasUrl;
}