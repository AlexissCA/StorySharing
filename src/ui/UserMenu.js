import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../features/authentication/useUser";
import styles from "./UserMenu.module.css";

export default function UserMenu({ popupRef, closePopup, openInviteMemberPopup }) {
	const navigate = useNavigate();
	const {mutate: logout} = useLogout()

	function handleClick(e) {
		if (e.target.id === "sign-out") {
			logout();
			navigate("/login");
		} else if (e.target.id === "invite-member") {
			closePopup();
			openInviteMemberPopup();
		}
	}

	return (
		<nav className={styles["user-menu"]} ref={popupRef} onClick={handleClick}>
			<a id="invite-member">Invite Member</a>
			<Link to="/profile-settings" tabIndex="-1">
				Profile Settings
			</Link>
			<a id="sign-out">Sign Out</a>
		</nav>
	);
}
