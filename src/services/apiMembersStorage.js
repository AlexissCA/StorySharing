import supabase from "./supabase";

export async function addMemberImage(imageFile) {
	await supabase.storage.from("members").upload(imageFile.name, imageFile, { upsert: true });
}

export async function deleteAllButAdminImage(userimageUrl) {
	const { data } = await supabase.storage.from("members").list("");

	const filesNames = data.filter(file => file.name !== userimageUrl).map(file => file.name);

	if (filesNames.length) await supabase.storage.from("members").remove(filesNames);
}
export async function deleteMemberImages(filesNames) {
	if (filesNames.length) await supabase.storage.from("members").remove(filesNames);
}
