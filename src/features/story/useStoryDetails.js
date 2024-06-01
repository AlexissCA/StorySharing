import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStory, getStory } from "../../services/apiStories";
import { addRatingsAndUpdateStories } from "../../services/apiRatings";
import { useNavigate } from "react-router-dom";

export function useGetStory(storyId, userId, isAdmin, setUserStoryRating, setIsNotFound) {
	const {
		isPending,
		data: story,
		error: isConnectionError,
	} = useQuery({
		queryKey: ["story", userId],
		queryFn: () => getStory(storyId, userId, isAdmin, setUserStoryRating, setIsNotFound),
	});

	return { isPending, story, isConnectionError };
}

export function useDeleteStory() {
	const navigate = useNavigate();
	const {
		isPending,
		isError: isConnectionError,
		mutate,
	} = useMutation({
		mutationFn: deleteStory,
		onSuccess: () => {
			navigate("/");
		},
	});

	return { isPending, isConnectionError, mutate };
}

export function useAddRating() {
	const queryClient = useQueryClient();
	const { mutate, isSuccess } = useMutation({
		mutationFn: addRatingsAndUpdateStories,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["story"],
			});
		},
	});

	return { isSuccess, mutate };
}
