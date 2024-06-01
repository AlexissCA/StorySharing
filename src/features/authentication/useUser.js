import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, login, logout } from "../../services/apiUsers";
import { useNavigate } from "react-router-dom";

export function useLoginApi(onSuccess, onError) {
	const queryClient = useQueryClient();

	const { mutateAsync } = useMutation({
		mutationFn: login,
		onSuccess: data => {
			queryClient.setQueryData(["user"], data.user);
			onSuccess();
		},
		onError: error => {
			onError(error?.message);
		},
	});

	return { mutateAsync };
}

export function useUser() {
	const { isPending, data: user } = useQuery({
		queryKey: ["user"],
		queryFn: getCurrentUser,
	});

	return { isPending, user, isAuthenticated: user?.role === "authenticated" };
}

export function useLogout() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: logout,
		onSuccess: () => {
			queryClient.removeQueries();
			navigate("/login", { replace: true });
		},
	});

	return { mutate };
}
