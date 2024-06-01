import styles from "./HeartIcon.module.css";

export default function HeartIcon({ id, fillValue, className = "" }) {
	let classes = `${styles["heart-icon"]} ${styles[className] || ""} `;
	if (fillValue) classes += styles["heart-icon-" + id];

	return (
		<div id={id}>
			<div className={classes} data-testid="heart-icon">
				{fillValue > 0 && fillValue < 1 && (
					<div
						className={styles["heart-icon-mask"]}
						style={{ width: `${100 - fillValue * 100}%` }}
						data-testid="heart-icon-mask"></div>
				)}
			</div>
		</div>
	);
}
