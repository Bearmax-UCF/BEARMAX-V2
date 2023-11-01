import { Router } from "express";
import { ExtractJwt } from "passport-jwt";
import requireLocalAuth from "../../middleware/requireLocalAuth";
import AuthToken from "../../models/AuthToken";
import User from "../../models/User";
import jwt from "jsonwebtoken";
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
	} catch (err) {
		return next(err);
	}

	try {
		new User({ email, firstName, lastName, password }).save();

		res.status(201).send({ message: "User created successfully!" });
	} catch (err) {
		return next(err);
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
