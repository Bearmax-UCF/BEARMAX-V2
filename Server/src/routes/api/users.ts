import { Router } from "express";
import requireJwtAuth from "../../middleware/requireJwtAuth";
import User from "../../models/User";
const router = Router();

router.get("/me", requireJwtAuth, (req, res) => {
	const me = req.user!;
	res.status(200).json({
		me,
	});
});

router.delete("/:id", requireJwtAuth, async (req, res, next) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);

		res.status(200).json({ user });
	} catch (err) {
		next(err);
	}
});
// TODO: implement update user
/*
router.patch("/:id", requireJwtAuth, async (req, res, next) => {
	
	try {
		const user = await User.findByIdAndUpdate(req.params.id);
		res.status(200).json({ user });
	} catch (err) {
		next(err);
	}
	
});
*/


export const basePath = "/users";

export default router;
