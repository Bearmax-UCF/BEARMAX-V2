export default {
	port: process.env.PORT || 8080,
	mailgun_api_key: process.env.MAILGUN_API_KEY || "",
	mailgun_domain: process.env.MAILGUN_DOMAIN || "",
	mongo_uri:
		process.env.MONGO_URI ||
		"",
	mongo_db: process.env.MONGO_DB || "test",
	isProduction: process.env.NODE_ENV === "test",
	secret_key: process.env.SECRET_KEY || "dontkeepme",
	bcrypt_log_rounds: Number(process.env.BCRYPT_LOG_ROUNDS) || 10,
	token_expires_in: process.env.TOKEN_EXPIRES_IN || "12h",
	server_url: process.env.NODE_ENV == "prod" ? "http://bearmaxcare.com:8080" : "http://localhost:8080",
};
