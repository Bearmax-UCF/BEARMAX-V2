import { Router } from "express";
import requireJwtAuth from "../../middleware/requireJwtAuth";
import UserPreferences from "../../models/UserPreferences";
const router = Router();

router.post("/:id", requireJwtAuth, async (req, res, next) => {
	const { userId, boolVideo, boolAudio, boolTaste, boolSmell, boolTouch } = req.body;
	const UserID =  req.user!._id;
	
	try {

		if(req.body.userId !== UserID.toString()) {
			return res.status(400).send({ message: "User id doesn't equal the API URL id." });
		}

		const userPrefCheck = await UserPreferences.findOne({ userId: req.user!._id });
		if(userPrefCheck !== null) {
			return res.status(400).send({ message: "User preferences already exists." });
		}

		const newUserPref = new UserPreferences({
			userId: userId,
			boolVideo: boolVideo,
			boolAudio: boolAudio,
			boolTaste: boolTaste,
			boolSmell: boolSmell,
			boolTouch: boolTouch
		});

		await newUserPref.save()
			.then(() => 
				res.status(201).send({ data: newUserPref, message: "User preferences successfully created." })
			)
			.catch((err) => res.status(400).send({ error: err, message: "User preferences not successfully created." }));

		} catch (err) {
			next(err);
		}
});

router.get("/:id", requireJwtAuth, async (req, res, next) => {
	try {

		await UserPreferences.findOne({ userId: req.user!._id })
			.then((userPreference) => {
				if (userPreference) {
					res.status(200).send({ boolSetup: true, data: userPreference.toObject(), message: "User preferences successfully retrieved." });
				} else {
					res.status(400).send({ boolSetup: false, message: "User preferences do not exist yet." });
				}
			})
			.catch((err) => console.log(err));

	} catch (err) {
		next(err);
	}
		
});

router.patch("/:id", requireJwtAuth, async (req, res, next) => {
	const { userId, boolVideo, boolAudio, boolTaste, boolSmell, boolTouch } = req.body;
	const UserID = req.user!._id;
	
	try {

		const userPrefCheck = await UserPreferences.findOne({ userId: req.user!._id });
		if(userPrefCheck === null) {
			return res.status(400).send({ message: "User preferences not found." });
		}

		const newUserPref = new UserPreferences({
			userId: userId,
			boolVideo: boolVideo,
			boolAudio: boolAudio,
			boolTaste: boolTaste,
			boolSmell: boolSmell,
			boolTouch: boolTouch
		});

		await UserPreferences.findOneAndUpdate({ userId: req.user!._id }, {userId: userId, boolVideo: boolVideo, boolAudio: boolAudio,
			boolTaste: boolTaste, boolSmell: boolSmell, boolTouch: boolTouch})
			.then(() => res.status(200).send({ data: newUserPref, message: "User preferences successfully updated." })
			)
			.catch((err) => res.status(400).send({ error: err, message: "User preferences not successfully updated." }));

	} catch (err) {
		next(err);
	}
});

router.delete("/:id", requireJwtAuth, async (req, res, next) => {

	try {

		const userPrefCheck = await UserPreferences.findOne({ userId: req.user!._id });
		if(userPrefCheck === null) {
			return res.status(400).send({ message: "User preferences not found." });
		}

		await UserPreferences.deleteOne({ userId: req.user!._id })
			.then(() => res.status(200).send({ message: "User preferences successfully deleted." })
			)
			.catch((err) => res.status(400).send({ error: err, message: "User preferences not successfully deleted." }));

	} catch (err) {
		next(err);
	}
});

/*
// This API was to clear any user preferences of the same userId that were accidentally created during testing
router.delete("/deleteMany/:id", requireJwtAuth, async (req, res, next) => {

	try {

		const userPrefCheck = await UserPreferences.findOne({ userId: req.user!._id });
		if(userPrefCheck === null) {
			return res.status(400).send({ message: "User preferences not found." });
		}

		await UserPreferences.deleteMany({ userId: req.user!._id })
			.then(() => res.status(200).send({ message: "User preferences successfully deleted." })
			)
			.catch((err) => res.status(400).send({ error: err, message: "User preferences not successfully deleted." }));

	} catch (err) {
		next(err);
	}
});
*/

export const basePath = "/userPreferences";

export default router;