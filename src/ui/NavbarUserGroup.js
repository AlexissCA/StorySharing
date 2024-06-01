import { useState } from "react";
import { useUser } from "../features/authentication/useUser";
import { COLOR_PRIMARY } from "../utils/constants";
import Popup from "./Popup";
import MemberAvatar from "./MemberAvatar";
import UserMenu from "./UserMenu";
import InviteMemberPopup from "../features/members/invite-member/InviteMemberPopup";
import styles from "./NavbarUserGroup.module.css";

export default function NavbarUserGroup() {
	const [isInviteMemberPopupOpen, setIsInviteMemberPopupOpen] = useState(false);
	const closeInviteMemberPopup = () => setIsInviteMemberPopupOpen(false);
	const openInviteMemberPopup = () => setIsInviteMemberPopupOpen(true);
	const { user } = useUser();
	const color = user.color || COLOR_PRIMARY;

	return (
		<div className={styles["navbar-user-group"]}>
			<p className={`${styles["navbar-username"]}`} style={{ color: color }}>
				{user.username}
			</p>
			<Popup>
				<Popup.Open>{openRef => <MemberAvatar openRef={openRef} img={user.img_url} color={color} className={`${styles["navbar-user-avatar"]}`}/>}</Popup.Open>
				<Popup.Window asPortal={false}>
					<UserMenu openInviteMemberPopup={openInviteMemberPopup} />
				</Popup.Window>
			</Popup>
			<Popup isOpenOutside={isInviteMemberPopupOpen} closeOutside={closeInviteMemberPopup}>
				<Popup.Window>
					<InviteMemberPopup />
				</Popup.Window>
			</Popup>
		</div>
	);
}
