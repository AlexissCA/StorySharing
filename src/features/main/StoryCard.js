import { Link } from "react-router-dom";
import { COLOR_PRIMARY, STORY_IMAGE_DEFAULT_URL } from "../../utils/constants";
import { formatDate } from "../../utils/stringHelpers";
import MemberAvatar from "../../ui/MemberAvatar";
import RatingDisplay from "../../ui/RatingDisplay";
import styles from "./StoryCard.module.css";

export default function StoryCard({ story }) {
	const color = story.members.color || COLOR_PRIMARY;

	return (
		<div className={styles["story-card"]} style={{ borderBottomColor: color }}>
			<img src={story.img_url || STORY_IMAGE_DEFAULT_URL} className={styles["story-card-img"]} alt={story.title} />
			<div className={styles["story-card-content"]}>
				<h3 className={styles["story-card-title"]} style={{ color: color }}>
					{story.title}
				</h3>
				<div className={styles["story-card-data"]}>
					<div className={styles["story-card-author-data"]}>
						<MemberAvatar img={story.members.img_url} color={color} />
						<span style={{ color: color }}>
							{story.members.username}
						</span>
					</div>
					<span className={styles["story-card-date"]}>{formatDate(story.created_at)}</span>
				</div>
				<p className={styles["story-card-text"]}>{story.text}</p>
				<RatingDisplay rating={story.rating} className={styles["story-card-rating"]} />
				<Link to={`/story/${story.id}`} className={`btn btn-2 ${styles["read-more-btn"]}`}>
					Read More
				</Link>
			</div>
		</div>
	);
}
