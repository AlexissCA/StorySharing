import supabase, { SUPABASE_URL } from "./supabase";
import { deleteMemberStories, deleteStories, updateStoriesRatings } from "./apiStories";
import { addMemberImage, deleteMemberImages, deleteAllButAdminImage } from "./apiMembersStorage";
import { getMemberRatings } from "./apiRatings";
import { extractImageFileNameFromUrl } from "../utils/imageFilesHelpers";
import { deleteAllButAdminUsers, deleteUser, register, updateUserPasswordWithOldPasswordCheck } from "./apiUsers";

export async function isAlreadyAMember(email) {
	const { data, error } = await supabase.from("members").select("id").eq("email", email);
	if (error) throw new Error(error.message);

	return !!data?.length;
}

export async function getMemberBy(columnName, value) {
	const { data, error } = await supabase
		.from("members")
		.select("id,username,img_url,color,is_admin,description,notify,uid")
		.eq(columnName, value)
		.single();
	if (error) throw new Error(error.message);
	return data;
}
export async function getMembers() {
	const { data, error } = await supabase.from("members").select("id,username,img_url,color,is_admin,description,notify,uid");
	if (error) throw new Error(error.message);
	return data;
}

export async function addMembers(membersArr) {
	for (let { member, imageFile, userAuthData } of membersArr) {
		const { user } = await register(userAuthData);

		member = { ...member, uid: user.id };

		if (imageFile?.name) {
			const imageError = await addMemberImage(imageFile);

			if (imageError && imageError.error !== "Duplicate") throw new Error(imageError.message);

			member = { ...member, img_url: SUPABASE_URL + "/storage/v1/object/public/members/" + imageFile.name };
		}
		const { error } = await supabase.from("members").insert([member]);

		if (error) throw new Error(error.message);
	}
}

export async function updateMember({ member, imageFile, passwordData }) {
	if (passwordData) await updateUserPasswordWithOldPasswordCheck(passwordData);

	const oldImageFileName = extractImageFileNameFromUrl(member.img_url);
	if (imageFile?.name && oldImageFileName !== imageFile?.name) {
		const imageError = await addMemberImage(imageFile);
		if (imageError && imageError.error !== "Duplicate") throw new Error(imageError.message);

		await deleteMemberImages([oldImageFileName]);

		member = { ...member, img_url: SUPABASE_URL + "/storage/v1/object/public/members/" + imageFile.name };
	}

	const { error } = await supabase.from("members").update(member).eq("id", member.id);
	if (error) throw new Error(error.message);
}

export async function deleteMember({ memberId, memberimageUrl, memberUid }) {
	const ratings = await getMemberRatings(memberId);

	await updateStoriesRatings(ratings);

	await deleteMemberStories(memberId);

	await deleteUser(memberUid);

	await deleteMemberImages([extractImageFileNameFromUrl(memberimageUrl)]);
}
export async function deleteMembers(userimageUrl) {
	await deleteStories();

	await deleteAllButAdminUsers();

	await deleteAllButAdminImage(extractImageFileNameFromUrl(userimageUrl));
}
