const app_name = "carewithbearmax";

export function buildPath(route) {
	if (process.env.NODE_ENV === "production")
		return "https://" + app_name + ".com" + route;
	else return "http://localhost:8080" + route;
}
