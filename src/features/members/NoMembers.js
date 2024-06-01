import NoResourcesMessage from "../../ui/NoResourcesMessage";
import Popup from "../../ui/Popup";
import InviteMemberPopup from "./invite-member/InviteMemberPopup";

export default function NoMembers() {
	return (
		<>
			<NoResourcesMessage margin="8.85rem" messageCode="no members" />
			<Popup>
				<Popup.Open>
					{openRef => (
						<button ref={openRef} className="btn btn-1">
							Invite Member
						</button>
					)}
				</Popup.Open>
				<Popup.Window>
					<InviteMemberPopup />
				</Popup.Window>
			</Popup>
		</>
	);
}
