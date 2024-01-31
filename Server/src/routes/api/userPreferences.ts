import { Router } from "express";
import requireJwtAuth from "../../middleware/requireJwtAuth";
import User from "../../models/User";
import crypto from "crypto";
import bcrypt from "bcrypt";
import constants from "../../utils/constants";
const router = Router();

router.post("/createUserPref/:id", requireJwtAuth, async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id);

        const boolVideo = req.body.boolVideo;
        const boolAudio = req.body.boolAudio;

		res.status(201).json({ user });
	} catch (err) {
		next(err);
	}
});

router.get("/getUserPref/:id", requireJwtAuth, async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id);

        const boolVideo = req.body.boolVideo;
        const boolAudio = req.body.boolAudio;

		res.status(200).json({ user });
	} catch (err) {
		next(err);
	}
});

router.patch("/updateUserPref/:id", requireJwtAuth, async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id);

        const boolVideo = req.body.boolVideo;
        const boolAudio = req.body.boolAudio;

		res.status(200).json({ user });
	} catch (err) {
		next(err);
	}
});

export const basePath = "/userPreferences";

export default router;