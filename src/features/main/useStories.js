import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteStories, getStories } from "../../services/apiStories";
import { useSearchParams } from "react-router-dom";
import { STORIES_PER_PAGE } from "../../utils/constants";

export function useGetStories(userId) {
	const queryClient = useQueryClient();
	const [searchParams] = useSearchParams();
	const filterMine = searchParams.get("filter") === "mine";
	const sortByTopRated = searchParams.get("sortBy") === "toprated";
	const page = +searchParams.get("page") || 1;

	const {
		isPending,
		data: { data, count } = {},
		error: isConnectionError,
	} = useQuery({
		queryKey: ["stories", filterMine, sortByTopRated, page, userId],
		queryFn: () => getStories(filterMine ? userId : "", sortByTopRated, page),
	});
	const stories = data || [];

	const totalPages = Math.ceil(count / STORIES_PER_PAGE);

	if (page < totalPages) {
		queryClient.prefetchQuery({
			queryKey: ["stories", filterMine, sortByTopRated, page + 1, userId],
			queryFn: () => getStories(filterMine ? userId : "", sortByTopRated, page + 1),
		});
	}
	if (page > 1) {
		queryClient.prefetchQuery({
			queryKey: ["stories", filterMine, sortByTopRated, page - 1, userId],
			queryFn: () => getStories(filterMine ? userId : "", sortByTopRated, page - 1),
		});
	}

	return { stories, count, isPending, isConnectionError, sortByTopRated, filterMine, page };
}

export function useDeleteStories() {
	const queryClient = useQueryClient();
	const {
		isPending,
		isError: isConnectionError,
		mutate,
	} = useMutation({
		mutationFn: deleteStories,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["stories"],
			});
		},
	});

	return { isPending, isConnectionError, mutate };
}
