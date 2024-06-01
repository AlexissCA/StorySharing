import supabase, { SUPABASE_URL } from "./supabase";
import { deleteMemberRatings, deleteRatings, deleteRatingsByStoriesIds, getMemberStoryRating } from "./apiRatings";
import { deleteStoriesImages, deleteAllStoriesImages, addStoryImage } from "./apiStoriesStorage";
import { extractImageFileNameFromUrl } from "../utils/imageFilesHelpers";
import { STORIES_PER_PAGE } from "../utils/constants";

export async function getStory(storyId, userId, isAdmin, setUserStoryRating, setIsNotFound) {
	const response = await supabase.from("stories").select("*,members(username,img_url,color)").eq("id", storyId).single();
	const { data, error } = response;
	if (error) {
		if (response.status === 406) {
			setIsNotFound(true);
			return;
		} else throw new Error(error.message);
	}

	if (!isAdmin && userId && userId !== data.author_id) {
		const data = await getMemberStoryRating(storyId, userId);

		setUserStoryRating(data ? data.rating : null);
	}

	return data;
}
export async function getStories(userId, sortByTopRated, page) {
	let query = supabase.from("stories").select(`*,members(username,img_url,color)`, { count: "exact" });

	if (userId) query = query.eq("author_id", userId);
	if (sortByTopRated === true || sortByTopRated === false) query = query.order(sortByTopRated ? "rating" : "id", { ascending: false });
	if (page) {
		const from = (page - 1) * STORIES_PER_PAGE;
		const to = from + STORIES_PER_PAGE - 1;
		query = query.range(from, to);
	}

	const response = await query;
	const { data, error, count } = response;

	if (error) {
		if (response.status == "416") return { data: null, count: 0 };
		throw new Error(error.message);
	}

	return { data, count };
}
export async function getMemberStories(memberId) {
	const { data, error } = await supabase.from("stories").select(`*,members(username,img_url,color)`).eq("author_id", memberId);
	if (error) throw new Error(error.message);
	return data;
}

export async function addStories(storiesArr) {
	// 	const membersToNotify = (await getMembers()).filter(a => a.notify).map(a => ({ username: a.username, email: a.email }));
	for (let { story, imageFile, notify } of storiesArr) {
		if (imageFile.name) {
			const imageError = await addStoryImage(imageFile);

			if (imageError && imageError.error !== "Duplicate") throw new Error(imageError.message);

			story = { ...story, img_url: SUPABASE_URL + "/storage/v1/object/public/stories/" + imageFile.name };
		}

		const { error } = await supabase.from("stories").insert([story]);

		if (error) throw new Error(error.message);

		// TODO - notify
		// if (notify) {
		// }
	}
}

export async function updateStoriesRatings(ratings, add = false) {
	for (const { story_id, rating } of ratings) {
		const { data: post, error } = await supabase.from("stories").select("*").eq("id", story_id).single();
		if (error) throw new Error(error.message);

		const newNumVotes = post.num_votes + (add ? 1 : -1);
		const newRating = (post.num_votes * post.rating + (add ? rating : -rating)) / newNumVotes;

		const { error: updateError } = await supabase.from("stories").update({ num_votes: newNumVotes, rating: newRating }).eq("id", story_id);
		if (updateError) throw new Error(updateError);
	}
}

export async function deleteStory({ storyId, storyimageUrl }) {
	await deleteRatingsByStoriesIds([storyId]);

	const { error } = await supabase.from("stories").delete().eq("id", storyId);
	if (error) throw new Error(error.message);

	if (storyimageUrl) await deleteStoriesImages(extractImageFileNameFromUrl(storyimageUrl));
}
export async function deleteStories() {
	await deleteRatings();

	const { data, error } = await supabase.from("stories").delete().neq("id", 0);
	if (error) throw new Error(error.message);

	await deleteAllStoriesImages();

	return data;
}
export async function deleteMemberStories(memberId) {
	await deleteMemberRatings(memberId);

	const stories = await getMemberStories(memberId);
	const [filesNames, storiesIds] = stories.reduce(
		(newArr, a) => {
			newArr[0].push(extractImageFileNameFromUrl(a.img_url));
			newArr[1].push(a.id);
			return newArr;
		},
		[[], []]
	);

	await deleteRatingsByStoriesIds(storiesIds);

	const { data, error } = await supabase.from("stories").delete().eq("author_id", memberId);
	if (error) throw new Error(error.message);

	await deleteStoriesImages(filesNames);

	return data;
}
