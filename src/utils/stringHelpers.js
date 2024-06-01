export function shortenFileName(s) {
	if (!s) return "";
	const arr = s.split(".");
	const extension = arr.pop();
	return s.length > 20 ? arr.join(".").slice(0, 17 - extension.length) + "..." + extension : s;
}

export function formatDate(s) {
	const date = new Date(s);
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	return zeroPad(day) + "." + zeroPad(month) + "." + year;
}

function zeroPad(n) {
	return n < 10 ? "0" + n : n;
}
