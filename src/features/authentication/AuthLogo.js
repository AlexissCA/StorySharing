import styles from "./AuthLogo.module.css";

export default function AuthLogo() {
	return (
		<div className={styles["auth-logo-container"]}>
			<h1 className={styles["auth-logo"]}>StorySharing</h1>
		</div>
	);
}
