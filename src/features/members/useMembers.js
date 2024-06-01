import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMembers, updateMember, deleteMember, deleteMembers, addMembers } from "../../services/apiMembers";

export function useGetMembers() {
	const { isPending, data, error: isConnectionError } = useQuery({ queryKey: ["members"], queryFn: getMembers });
	const members = data || [];

	return { isPending, members, isConnectionError };
}

export function useAddMembers(onSuccess, onError) {
	const queryClient = useQueryClient();

	const { mutateAsync } = useMutation({
		mutationFn: addMembers,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["members"],
			});
			onSuccess();
		},
		onError,
	});

	return { mutateAsync };
}

export function useUpdateMember(onSuccess, onError) {
	const queryClient = useQueryClient();

	const { isPending, mutate } = useMutation({
		mutationFn: updateMember,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["user"],
			});
			onSuccess();
		},
		onError: error => {
			onError(error?.message );
		},
	});

	return { isPending, mutate };
}

export function useDeleteMember() {
	const queryClient = useQueryClient();

	const {
		isPending,
		isError: isConnectionError,
		mutate,
	} = useMutation({
		mutationFn: deleteMember,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["members"],
			});
		},
	});

	return { isPending, isConnectionError, mutate };
}
export function useDeleteMembers() {
	const queryClient = useQueryClient();

	const {
		isPending,
		isError: isConnectionError,
		mutate,
	} = useMutation({
		mutationFn: deleteMembers,
		onSuccess: () => {
			queryClient.invalidateQueries();
		},
	});

	return { isPending, isConnectionError, mutate };
}
