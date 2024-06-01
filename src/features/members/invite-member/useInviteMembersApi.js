import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addInvitation } from "../../../services/apiInviteMember";

export function useAddInvtation() {
	const queryClient = useQueryClient();

	const { mutateAsync } = useMutation({
		mutationFn: addInvitation,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["invited_members_emails"],
			});
		},
	});

	return { mutateAsync };
}
