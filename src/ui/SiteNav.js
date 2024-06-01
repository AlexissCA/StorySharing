import { NavLink } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import styles from "./SiteNav.module.css";

export default function SiteNav() {
	const { user } = useUser();
	return (
		<nav className={styles["site-nav"]}>
			<NavLink to="/">Home</NavLink>
			{!user.is_admin && <NavLink to="/share-story">Share Story</NavLink>}
			<NavLink to="/members">Members</NavLink>
		</nav>
	);
}
