import { Router } from "express";
import { ExtractJwt } from "passport-jwt";
import requireLocalAuth from "../../middleware/requireLocalAuth";
import AuthToken from "../../models/AuthToken";
import ResetToken from "../../models/ResetToken";
import User from "../../models/User";
import jwt from "jsonwebtoken";
import constants from "../../utils/constants";
import { sendPasswordReset } from '../../services/mailgunService';
import bcrypt from "bcrypt";
import crypto from "crypto";
import { resetPasswordEmailTemplate } from "../../utils/email";

const router = Router();

router.get("/ping", async (_, res) => {
	res.status(200).json("pong!");
});

router.post("/login", requireLocalAuth, async (req, res) => {
	const token = req.user!.generateToken();

	await AuthToken.registerAuthToken(token);

	res.status(200).send({
		token,
		id: req.user!.id,
		message: "Logged in!",
	});
});

router.post("/register", async (req, res, next) => {
	const { email, firstName, lastName, password } = req.body;
	if (!email || !firstName || !lastName || !password)
		return res.status(400).send({ message: "Missing one or more fields." });

	try {
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return res.status(422).send({
				message: "Another User with this email already exists!",
			});
		}
		await new User({ email, firstName, lastName, password}).save();
		res.status(201).send({ message: "User created successfully!" });
	} catch (err) {
		return next(err);
	}
});

router.post("/forgotPasswordRequest", async (req, res, next) => {
	const email = req.body.email;
	if (!email) 
		return res.status(400).send({ message: "Missing email field." });
	try {
		const user = await User.findOne({ email });
		if(!user)
			return res.status(422).send({ message: "User not found." });
		const unhashToken = crypto.randomBytes(32).toString('hex');
		await new ResetToken({ userId: user._id, token: unhashToken }).save();
		await sendPasswordReset(
			email,
			unhashToken,
			user._id.toString()
		).catch((err) => console.log(err));
		
		res.status(201).send({ message: "Password Reset Request Sent Successfully!" });
	} catch (error) {
		return next(error);
	}
});

router.post("/resetPassword", async (req, res, next) => {
	const token = req.body.token;
	const id = req.body.id;
	const newPassword = req.body.password;
	if (!token || !id || !newPassword) 
		return res.status(400).send({ message: "Missing one or more fields." });
	try {
		const resetToken = await ResetToken.findOne({ userId: id });
		if(!resetToken)
			return res.status(422).send({ message: "Reset token not found." });
		const compare = await resetToken.verifyResetToken(token);
		if(compare) {
			const user = await User.findById(id);
			if(!user)
				return res.status(422).send({ message: "User not found." });
			// comparePassword
			const isMatch = await user.comparePassword(newPassword);
			if(!isMatch) {
				user.password = newPassword;
				user.save();
				resetToken.deleteResetToken();
				return res.status(201).send({ message: "Password Reset Successfully!" });
			} else {
				return res.status(422).send({ message: "New password cannot be the same as the old password." });
			}
		} else {
			return res.status(422).send({ message: "Invalid token." });	
		}
	} catch (error) {
		return next(error);
	}
});

router.get("/verify", async (req, res, next) => {
	try {
		const token = req.query.token as string;
		const id = req.query.id as string;
		const user = await User.findById(id);
		if(!user)
			return res.status(422).send({ message: "User not found." });
		if(user.isVerified) 
			return res.status(422).send({ message: "User already verified." });
		if(token) {
			const compare = await bcrypt.compare(token, user.hashToken as string);
			if(compare) {
				user.hashToken = "";
				user.isVerified = true;
				user.save();
				return res.status(200).send({ message: "User verified!" });
			} else {
				return res.status(422).send({ message: "Invalid token." });
			}
		} else {
			return res.status(400).send({ message: "Missing token." });
		}
	} catch (error) {
		return next(error);
	}
});

router.get("/logout", async (req, res, next) => {
	const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
	if (token) {
		const tokData = jwt.decode(token, { json: true });
		if (tokData) {
			const { jti } = tokData;
			try {
				const t = await AuthToken.findOne({ jti });
				t?.revoke();
				return res.status(200).send({ message: "Successfully logged out!" });
			} catch (err) {
				return res.status(400).send({
					message:
						"Logout failed: Couldn't find token in collection.",
				});
			}
		}
	}
	return res.status(400).send({
		message: "Logout failed: Couldn't decode token from request.",
	});
});

export const basePath = "/auth";

export default router;
