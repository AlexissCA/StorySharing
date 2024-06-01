import styles from "./Showcase.module.css";

export default function Showcase({ lower }) {
	return (
		<div className={`${styles["showcase"]} ${lower ? styles["showcase-lower"] : ""}`}>
			<h2 className={styles["main-title"]}>What's Your Story Today?</h2>
		</div>
	);
}
