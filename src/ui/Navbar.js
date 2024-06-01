import Logo from "./Logo";
import NavbarUserGroup from "./NavbarUserGroup";
import SiteNav from "./SiteNav";
import styles from "./Navbar.module.css";

export default function Navbar() {
	return (
		<div className={styles["navbar"]}>
			<div className="width-container relative-right">
				<div className="flex-justified">
					<Logo className="logo" />
					<NavbarUserGroup />
				</div>
				<SiteNav />
			</div>
		</div>
	);
}
