import HeartIcon from "./HeartIcon";
import styles from "./RatingDisplay.module.css";

export default function RatingDisplay({
	rating,
	className = "",
	iconClassName = "",
	handleHover = null,
	handleLeave = null,
	handleClick = null,
}) {
	let rate = rating;

	return (
		<div className={`${styles["rating"]} ${className}`} onMouseMove={handleHover} onMouseLeave={handleLeave} onClick={handleClick}>
			{Array(5)
				.fill(1)
				.map((a, i) => {
					const element = <HeartIcon key={a + i} id={a + i} fillValue={rate >= 1 ? 1 : rate > 0 ? rate : 0} className={iconClassName} />;
					rate--;
					return element;
				})}
		</div>
	);
}
