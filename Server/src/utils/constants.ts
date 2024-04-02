const cutStringQuote = (rawConnectionString: string | undefined) => {
	if (!rawConnectionString) return ("") as string;
    return (rawConnectionString.charAt(0) === '"' && rawConnectionString.charAt(rawConnectionString.length - 1)) ? 
    rawConnectionString.substring(1, rawConnectionString.length - 1) : 
    rawConnectionString;
}
export default {
    port: process.env.PORT || 8080,
    mailgun_api_key: process.env.MAILGUN_API_KEY || "",
    mailgun_domain: process.env.MAILGUN_DOMAIN || "",
    mongo_uri:
        process.env.MONGO_URI ||
        "",
    mongo_db: process.env.MONGO_DB || "test",
    isProduction: process.env.NODE_ENV === "prod",
    secret_key: process.env.SECRET_KEY || "dontkeepme",
    bcrypt_log_rounds: Number(process.env.BCRYPT_LOG_ROUNDS) || 10,
    token_expires_in: process.env.TOKEN_EXPIRES_IN || "12h",
    server_url: process.env.NODE_ENV == "prod" ? "https://www.bearmaxcare.com" : "http://localhost:8080",
    azure_connection_string: cutStringQuote(process.env.AZURE_STORAGE_CONNECTION_STRING) || "not the token",
    azure_storage_account: process.env.AZURE_STORAGE_ACCOUNT || "",
	azure_account_key: process.env.AZURE_ACCOUNT_KEY || ""
};
