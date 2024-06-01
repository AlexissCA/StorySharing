export function extractImageFileNameFromUrl(s) {
	return s ? s.split("/").pop() : "";
}

export async function createImageFileFromUrl(path) {
	const response = await fetch(path);
	const blob = await response.blob();
	return new File([blob], extractImageFileNameFromUrl(path), { type: "image/jpeg" });
}
