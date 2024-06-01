import supabase from "./supabase";

export async function addStoryImage(imageFile) {
	await supabase.storage.from("stories").upload(imageFile.name, imageFile, {upsert: true});
}

export async function deleteAllStoriesImages() {
	const { data } = await supabase.storage.from("stories").list("");
	const filesNames = data.map(file => file.name);

	if (filesNames.length) await supabase.storage.from("stories").remove(filesNames);
}
export async function deleteStoriesImages(filesNames) {
	if (filesNames.length) await supabase.storage.from("stories").remove(filesNames);
}
