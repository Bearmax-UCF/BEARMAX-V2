export default {
	port: process.env.PORT || 8080,
	mongo_uri:
		process.env.MONGO_URI ||
		"mongodb+srv://bearMaxV2:9OZ0mL0i6y7kHWV8@bearmax.glw4y8i.mongodb.net/?retryWrites=true&w=majority",
	mongo_db: process.env.MONGO_DB || "test",
	isProduction: process.env.NODE_ENV === "test",
	secret_key: process.env.SECRET_KEY || "dontkeepme",
	bcrypt_log_rounds: Number(process.env.BCRYPT_LOG_ROUNDS) || 10,
	token_expires_in: process.env.TOKEN_EXPIRES_IN || "12h",
};
