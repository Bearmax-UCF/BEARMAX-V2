import { Router } from "express";
import requireJwtAuth from "../../middleware/requireJwtAuth";
import EmotionRecognition from "../../models/EmotionRecognition";

const router = Router();

/*
router.post("/", requireJwtAuth, async (req, res, next) => {
	const { Correct, Wrong, NumPlays } = req.body;
	const GameFin = new Date();
	const UserID = req.user!._id;

	if (!Correct || !Wrong || !NumPlays) {
		return res.status(400).send({ message: "Missing fields" });
	}

	try {
		const finishedGame = new EmotionRecognition({
			Correct,
			Wrong,
			NumPlays,
			GameFin,
			UserID,
		});

		finishedGame.save();
		res.status(200).send();
	} catch (err) {
		next(err);
	}
});
*/

router.get("/", requireJwtAuth, async (req, res, next) => {
	// Get all emotion games with UserID equal and return them
	try {
		const allGames = await EmotionRecognition.find({
			UserID: req.user!._id.toString(),
		});
		res.status(200).json({allGames});
	} catch (err) {
		next(err);
	}
});

router.delete("/:id", requireJwtAuth, async (req, res, next) => {
	// Delete EmotionRecognition doc with matching id
	try {
		const deleted = await EmotionRecognition.findByIdAndDelete(
			req.params.id
		);
		res.status(200).json({ deleted });
	} catch (err) {
		next(err);
	}
});

export const basePath = "/emotionRecognition";

export default router;
