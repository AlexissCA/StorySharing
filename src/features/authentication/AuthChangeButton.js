import { Link } from "react-router-dom";
import styles from "./AuthChangeButton.module.css";

export default function AuthChangeButton({ to = "", isDisabled = false }) {
	return (
		<div className={styles["auth-change"]}>
			<Link to={`/${to.toLowerCase()}`}>
				<button className={`btn btn-2 ${styles["auth-change-btn"]}`} disabled={isDisabled}>
					{to}
				</button>
			</Link>
		</div>
	);
}
