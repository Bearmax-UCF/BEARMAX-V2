import { Router } from "express";
import requireJwtAuth from "../../middleware/requireJwtAuth";
import GalvanicSkinResponse from "../../models/GalvanicSkinResponse";

const router = Router();

router.post("/", requireJwtAuth, async (req, res, next) => {
	const { GSRData, GSRTime } = req.body;
	const UserID = req.user!._id;
	const RecordingDate = new Date();

	try {
		const data = new GalvanicSkinResponse({
			GSRData,
			GSRTime,
			RecordingDate,
			UserID,
		});

		data.save();
		res.status(200).send({ id: data._id });
	} catch (err) {
		next(err);
	}
});

router.get("/", requireJwtAuth, async (req, res, next) => {
	try {
		const allData = await GalvanicSkinResponse.find({
			UserID: req.user!._id.toString(),
		});
		res.status(200).json(allData);
	} catch (err) {
		next(err);
	}
});

router.delete("/:id", requireJwtAuth, async (req, res, next) => {
	try {
		const deleted = await GalvanicSkinResponse.findByIdAndRemove(
			req.params.id
		);
		res.status(200).json({ deleted });
	} catch (err) {
		next(err);
	}
});

export const basePath = "/gsr";

export default router;
