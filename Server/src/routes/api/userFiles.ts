import { Router } from "express";
import requireJwtAuth from "../../middleware/requireJwtAuth";
import UserFiles from "../../models/UserFiles";
const router = Router();

router.post("/:id", requireJwtAuth, async (req, res, next) => {
	const { userId, audioName, audioLink, videoName, videoLink } = req.body;
	const UserID =  req.user!._id;
	
	try {

		if(req.body.userId !== UserID.toString()) {
			return res.status(400).send({ message: "User id doesn't equal the API URL id." });
		}

		const newUserFile = new UserFiles({
			userId: userId,
			audioFileList: (audioName != "" && audioLink != "") ? { audioName: audioName, audioLink: audioLink }: [],
			videoFileList: (videoName != "" && videoLink != "") ? { videoName: videoName, videoLink: videoLink }: []
		});

		await newUserFile.save()
			.then(() => 
				res.status(201).send({ data: newUserFile, message: "User files successfully created." })
			)
			.catch((err) => res.status(400).send({ error: err, message: "User files not successfully created." }));

		} catch (err) {
			next(err);
		}
});

router.get("/:id", requireJwtAuth, async (req, res, next) => {
	const UserID = req.user!._id;

	try {

		await UserFiles.findOne({ userId: UserID.toString() })
			.then((userFile) => {
				if (userFile) {
					res.status(200).send({ boolSetup: true, data: userFile.toObject(), message: "User files successfully retrieved." });
				} else {
					res.status(400).send({ boolSetup: false, message: "User files do not exist yet." });
				}
			})
			.catch((err) => console.log(err));

	} catch (err) {
		next(err);
	}
		
});

router.patch("/:id", requireJwtAuth, async (req, res, next) => {
	const { userId, audioName, audioLink, videoName, videoLink } = req.body;
	const UserID = req.user!._id;
	
	try {

		const userFileCheck = await UserFiles.findOne({ userId: UserID.toString() });
		if(userFileCheck === null) {
			return res.status(400).send({ message: "User files not found." });
		}

		await UserFiles.findOne({ userId: UserID.toString() })
			.then((userFile) => {
				if (userFile) {

					if(videoName != "" && videoLink != "" && audioName == "" && audioLink == "") {
						userFile.videoFileList.push({ videoName: videoName, videoLink: videoLink });
					}
					else if(videoName == "" && videoLink == "" && audioName != "" && audioLink != "") {
						userFile.audioFileList.push({ audioName: audioName, audioLink: audioLink });
					}
					else if(videoName != "" && videoLink != "" && audioName != "" && audioLink != "") {
						userFile.audioFileList.push({ audioName: audioName, audioLink: audioLink });
						userFile.videoFileList.push({ videoName: videoName, videoLink: videoLink });
					}
					else return res.status(400).send({ message: "No audio or video file was provided or incorrect API body format." });

					userFile.save()
						.then(() => res.status(200).send({ data: userFile, message: "User files successfully updated." })
						)
						.catch((err) => res.status(400).send({ error: err, message: "User files not successfully updated." }));
				} else {
					res.status(400).send({ boolSetup: false, message: "User files had an issue accessing." });
				}
			})
			.catch((err) => console.log(err));

	} catch (err) {
		next(err);
	}
});

router.delete("/deleteUserFile/:id", requireJwtAuth, async (req, res, next) => {

	try {

		const userFileCheck = await UserFiles.findOne({ userId: req.user!._id });
		if(userFileCheck === null) {
			return res.status(400).send({ message: "User files not found." });
		}

		await UserFiles.deleteOne({ userId: req.user!._id })
			.then(() => res.status(200).send({ message: "User files successfully deleted." })
			)
			.catch((err) => res.status(400).send({ error: err, message: "User files not successfully deleted." }));

	} catch (err) {
		next(err);
	}
});

router.delete("/deleteFileEntry/:id", requireJwtAuth, async (req, res, next) => {

	try {

		const { blobName } = req.body;
		const userFile = await UserFiles.findOne({ userId: req.user!._id });

		if (!userFile) {
			return res.status(400).send({ message: "User files not found." });
		}

		const audioFileIndex = userFile.audioFileList.findIndex((audioFile) => audioFile.audioName === blobName);
		const videoFileIndex = userFile.videoFileList.findIndex((audioFile) => audioFile.audioName === blobName);

		if (audioFileIndex === -1 && videoFileIndex === -1) {
			return res.status(400).send({ message: "File not found in user's file list." });
		}

		if (audioFileIndex !== -1) {
			userFile.audioFileList.splice(audioFileIndex, 1);
		}

		if (videoFileIndex !== -1) {
			userFile.videoFileList.splice(videoFileIndex, 1);
		}

		await userFile.save()
			.then(() => res.status(200).send({ message: "File successfully deleted from user's file list." }))
			.catch((err) => res.status(400).send({ error: err, message: "File not successfully deleted from user's file list." }));


	} catch (err) {
		next(err);
	}
});

export const basePath = "/userFiles";

export default router;