import styles from "./Spinner.module.css";

export default function Spinner({ margin = "6rem", marginBottom, darkBg = false }) {
	const textShadowStyle = darkBg ? { textShadow: "0 1px 7px #0003" } : {};

	return (
		<div className={styles["spinner-container"]} style={{ marginTop: margin, marginBottom: marginBottom || margin }}>
			<div className={styles["spinner"]}></div>
			<h3 className={styles["spinner-msg"]} style={textShadowStyle}>
				loading...
			</h3>
		</div>
	);
}
