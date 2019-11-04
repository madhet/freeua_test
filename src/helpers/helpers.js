const checkDate = date => {
	if (date.length < 10) return false;
	let [day, month, year] = date.split("/").map(item => parseInt(item));
	if (year < 1900 || year > new Date().getFullYear()) {
		return false;
	} else if (month < 1 || month > 12) {
		return false;
	} else if (day < 1 || day > 31) {
		return false;
	} else if (month === 2) {
		if ((year % 4 && day > 28) || (!(year % 4) && day > 29)) return false;
	} else if ([4, 6, 9, 11].includes(month) && day > 30) return false;
	return true;
};

const dateToStr = date => {
	return date
		.split("T")[0]
		.split("-")
		.reverse()
		.join("/");
};

const strToDate = date => {
	return date
		.split("/")
		.reverse()
		.join("-");
};

const calcAge = date => {
	let start = new Date(strToDate(date));
	let now = new Date();
	let age = Math.floor((now - start) / (1000 * 3600 * 24 * 365.25));
	return age;
};

export { checkDate, dateToStr, strToDate, calcAge };
