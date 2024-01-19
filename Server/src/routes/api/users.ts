import { Router } from "express";
import requireJwtAuth from "../../middleware/requireJwtAuth";
import User from "../../models/User";
import crypto from "crypto";
import bcrypt from "bcrypt";
import constants from "../../utils/constants";
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

router.patch("/:id", requireJwtAuth, async (req, res, next) => {
	const id = req.params.id;

	try {
		if(id) {
			const user = await User.findById(id);
			if(!user) {
				return res.status(404).send({ message: "User not found" });
			}
			const { email, password, firstName, lastName } = req.body;
			// check if new email is taken already
			if(email) {
				const emailTaken = await User.findOne({ email: email });
				if(emailTaken) {
					return res.status(400).send({ message: "Email already taken" });
				}
				user.email = email;
			}
			if(password) {
				user.password = password;
			}
			if(firstName) {
				user.firstName = firstName;
			}
			if(lastName) {
				user.lastName = lastName;
			}
			await user.save();
			return res.status(200).send({ user: user });
		} else {
			return res.status(400).send({ message: "Missing id in parameter" });
		}
	} catch (err) {
		next(err);
	}
	
});



export const basePath = "/users";

export default router;
