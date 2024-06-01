import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addStories } from "../../services/apiStories";

export default function useAddStories(onSuccess, onError) {
	const queryClient = useQueryClient();
	
	const { isPending, mutate } = useMutation({
		mutationFn: addStories,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["stories"],
			});
			onSuccess();
		},
		onError,
	});

	return { isPending, mutate };
}
