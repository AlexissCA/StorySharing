import { useDeleteMembers, useDeleteMember } from "./useMembers";
import Popup from "../../ui/Popup";
import ConfirmActionPopup from "../../ui/ConfirmActionPopup";
import styles from "./DeleteMembers.module.css";

export function DeleteMember({ memberId, memberimageUrl, memberUid }) {
	const buttonLabel = "Delete Member";

	return (
		<Popup>
			<Popup.Open>
				{openRef => (
					<button ref={openRef} className={`btn btn-2 ${styles["delete-member-btn"]}`}>
						{buttonLabel}
					</button>
				)}
			</Popup.Open>
			<Popup.Window>
				<ConfirmActionPopup
					messageCode="delete member"
					buttonLabel={buttonLabel}
					hook={useDeleteMember}
					mutateProps={{ memberId, memberimageUrl, memberUid }}
				/>
			</Popup.Window>
		</Popup>
	);
}

export function DeleteMembers({ userimageUrl }) {
	const buttonLabel = "Delete All Members";

	return (
		<Popup>
			<Popup.Open>
				{openRef => (
					<button ref={openRef} className={`btn btn-2 ${styles["delete-all-members-btn"]}`}>
						{buttonLabel}
					</button>
				)}
			</Popup.Open>
			<Popup.Window>
				<ConfirmActionPopup messageCode="delete all members" buttonLabel={buttonLabel} hook={useDeleteMembers} mutateProps={userimageUrl} />
			</Popup.Window>
		</Popup>
	);
}
