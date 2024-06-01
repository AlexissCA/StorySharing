import supabase from "./supabase";
import { updateStoriesRatings } from "./apiStories";

export async function getMemberRatings(memberId) {
	const { data, error } = await supabase.from("ratings").select("story_id, rating").eq("member_id", memberId);
	if (error) throw new Error(error.message);

	return data;
}
export async function getMemberStoryRating(storyId, memberId) {
	const { data } = await supabase.from("ratings").select("rating").eq("story_id", storyId).eq("member_id", memberId);

	return data.length ? data.pop() : null;
}

export async function addRatings(ratingsArr) {
	const { error } = await supabase.from("ratings").insert(ratingsArr);
	if (error) throw new Error(error.message);
}
export async function addRatingsAndUpdateStories(ratingsArr) {
	await addRatings(ratingsArr);
	await updateStoriesRatings(ratingsArr, true);
}

export async function deleteMemberRatings(memberId) {
	const { error } = await supabase.from("ratings").delete().eq("member_id", memberId);
	if (error) throw new Error(error.message);
}
export async function deleteRatingsByStoriesIds(storiesIds) {
	const { error } = await supabase.from("ratings").delete().in("story_id", storiesIds);
	if (error) throw new Error(error.message);
}
export async function deleteRatings() {
	const { error } = await supabase.from("ratings").delete().neq("id", 0);
	if (error) throw new Error(error.message);
}
