export function getFormattedDate(date) {
	if (typeof date === "string") return date;

	const year = date.getFullYear();

	let month = (1 + date.getMonth()).toString();
	month = month.length > 1 ? month : "0" + month;

	let day = date.getDate().toString();
	day = day.length > 1 ? day : "0" + day;

	let dateString = month + "/" + day + "/" + year;

	let hour = date.getHours();
	let formattedHour = hour % 12 === 0 ? 12 : hour % 12;
	let minute = date.getMinutes();
	let suffix = hour >= 12 ? "PM" : "AM";

	let timeString =
		formattedHour +
		":" +
		(minute < 10 ? "0" + minute : minute) +
		" " +
		suffix;

	return dateString + ", " + timeString;
}

export function getFormattedTime(date) {
	if (typeof date === "string") return date;

	let hour = date.getHours();
	const formattedHour = (hour < 10 ? "0" : "") + hour;
	let minute = date.getMinutes();
	const formattedMinute = (minute < 10 ? "0" : "") + minute;
	let second = date.getSeconds();
	const formattedSecond = (second < 10 ? "0" : "") + second;
	const milli = date.getMilliseconds();
	let formattedMilli = milli + "";
	while (milli.length < 4) formattedMilli = "0" + formattedMilli;

	return (
		formattedHour +
		":" +
		formattedMinute +
		":" +
		formattedSecond +
		"." +
		formattedMilli
	);
}

export function getFileName(date) {
	if (typeof date === "string") return date;

	const year = date.getFullYear();

	let month = (1 + date.getMonth()).toString();
	month = month.length > 1 ? month : "0" + month;

	let day = date.getDate().toString();
	day = day.length > 1 ? day : "0" + day;

	const dateString = month + "-" + day + "-" + year;
	const timeString = getFormattedTime(date).replace(/:/g, "-");

	return dateString + "_" + timeString;
}
