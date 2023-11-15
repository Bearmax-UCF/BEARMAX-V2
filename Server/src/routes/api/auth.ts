import { Router } from "express";
import { ExtractJwt } from "passport-jwt";
import requireLocalAuth from "../../middleware/requireLocalAuth";
import AuthToken from "../../models/AuthToken";
import User from "../../models/User";
import jwt from "jsonwebtoken";
import constants from "../../utils/constants";
import mailgun from '../../services/mailgunService';
import bcrypt from "bcrypt";
import crypto from "crypto";

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
	const isVerified = false;
	if (!email || !firstName || !lastName || !password)
		return res.status(400).send({ message: "Missing one or more fields." });

	try {
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return res.status(422).send({
				message: "Another User with this email already exists!",
			});
		}
	} catch (err) {
		return next(err);
	}

	try {
		const unhashToken = crypto.randomBytes(32).toString('hex');
		const hashToken = await bcrypt.hash(unhashToken, constants.bcrypt_log_rounds);
		const user = await new User({ email, firstName, lastName, password, isVerified, hashToken}).save();
	
		// send email to user on registration
		mailgun.send(email, 
			'Password Verification',
			 `<h1>Hello!</h1>
			 <p> Please verify your bearmax account by clicking the following link: http://localhost:8080/api/auth/verify?token=${unhashToken}&id=${user._id}</p>
			 `
			 )
		.catch((err) => console.log(err));
		res.status(201).send({ message: "User created successfully!" });
	} catch (err) {
		return next(err);
	}
});

router.get("/verify", async (req, res, next) => {
	try {
		const token = req.query.token as string;
		const id = req.query.id as string;
		const user = await User.findById(id);
		if(!user)
			return res.status(400).send({ message: "User not found." });
		if(user.isVerified) 
			return res.status(400).send({ message: "User already verified." });
		if(token) {
			const compare = await bcrypt.compare(token, user.hashToken as string);
			if(compare) {
				user.hashToken = "";
				user.isVerified = true;
				user.save();
				return res.status(201).send({ message: "User verified!" });
			} else {
				return res.status(400).send({ message: "Invalid token." });
			}
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
