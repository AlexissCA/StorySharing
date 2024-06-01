import { useState } from "react";
import { useAddRating } from "./useStoryDetails";
import RatingDisplay from "../../ui/RatingDisplay";
import styles from "./RatingInteractive.module.css";

export default function RatingInteractive({ iconClassName = "", userId, storyId }) {
	const [tempRating, setTempRating] = useState(null);
	const { mutate } = useAddRating();

	function handleHover(e) {
		const id = e.target.id;
		const mouseX = e.pageX;
		const elementBox = e.target.getBoundingClientRect();
		const elementWidth = elementBox.width;
		const elementX = elementBox.left;
		const elementPR = +getComputedStyle(e.target).paddingRight.slice(0, -2);
		const elementPL = +getComputedStyle(e.target).paddingLeft.slice(0, -2);
		const value = id - 1 + (mouseX - elementX) / (elementWidth - elementPR + elementPL);

		// checking if hover is on last icon and mouse is over its padding 
		setTempRating(elementPR && value < 0 ? 5 : value)
	}

	function handleLeave() {
		setTempRating(0);
	}

	function handleClick() {
		const rating = Math.floor(tempRating * 10) / 10;
		mutate([{ rating, story_id: storyId, member_id: userId }]);
	}

	return (
		<div className={styles["rate-box"]}>
			<RatingDisplay
				rating={tempRating}
				className={`${styles["rate"]} hoverable-shapes-area`}
				iconClassName={iconClassName}
				handleHover={handleHover}
				handleLeave={handleLeave}
				handleClick={handleClick}
			/>
		</div>
	);
}
