import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useUser } from "../../features/authentication/useUser";
import { useGetStory } from "./useStoryDetails";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { COLOR_PRIMARY, STORY_IMAGE_DEFAULT_URL } from "../../utils/constants";
import ProblemMessage from "../../ui/ProblemMessage";
import MainContainer from "../../ui/MainContainer";
import ErrorMessage from "../../ui/ErrorMessage";
import Spinner from "../../ui/Spinner";
import MemberAvatar from "../../ui/MemberAvatar";
import RatingDisplay from "../../ui/RatingDisplay";
import DeleteStory from "./DeleteStory";
import RatingInteractive from "./RatingInteractive";
import styles from "./StoryDetails.module.css";

export default function StoryDetails() {
	const { user } = useUser();
	const [isNotFound, setIsNotFound] = useState(false);
	const [userStoryRating, setUserStoryRating] = useState(null);
	const { id: storyId } = useParams();
	const { isPending, story, isConnectionError } = useGetStory(storyId, user.id, user.is_admin, setUserStoryRating, setIsNotFound);
	useDocumentTitle(story?.title);

	const color = story?.members.color || COLOR_PRIMARY;

	if (isNotFound) {
		return <ProblemMessage />;
	}
	if (isConnectionError) {
		return (
			<MainContainer>
				<ErrorMessage margin="18.4rem" />
			</MainContainer>
		);
	}
	if (isPending) {
		return (
			<MainContainer>
				<Spinner margin="13.9rem" />
			</MainContainer>
		);
	}

	return (
		<MainContainer>
			<div className={styles["story-details"]}>
				<img
					className={styles["story-details-img"]}
					src={story?.img_url || "../" + STORY_IMAGE_DEFAULT_URL}
					alt={story?.title}
					style={{ borderBottomColor: story?.members.color || COLOR_PRIMARY }}
				/>
				<div className={styles["story-details-content"]}>
					<h3 className={styles["story-title"]} style={{ color: color }}>
						{story?.title}
					</h3>
					<div className={`${styles["story-data"]} flex-justified`}>
						<div className={styles["story-author"]}>
							<MemberAvatar img={story?.members.img_url} color={color} className={styles["story-author-img"]} />
							<span className={styles["story-author-username"]} style={{ color: color }}>
								{story?.members.username}
							</span>
						</div>
						<div className={styles["story-details-data-right"]}>
							<RatingDisplay className={styles["story-rating"]} rating={story?.rating} />
							<span className={styles["story-date"]}>{story?.date}</span>
						</div>
					</div>
					<p>{story?.text}</p>
					{user.is_admin ? (
						<DeleteStory storyId={story?.id} storyimageUrl={story?.img_url} />
					) : story?.author_id === user.id ? (
						<Link to="/share-story">
							<button className="btn btn-1 m-t-big">Share New Story</button>
						</Link>
					) : (
						<>
							<div className={styles["user-rating"]}>
								<h3>{userStoryRating !== null ? "Your rate:" : "Rate story:"}</h3>
								{userStoryRating !== null ? (
									<RatingDisplay
										rating={userStoryRating}
										className={`hoverable-shapes-area ${styles["user-rating-sides-padding"]}`}
										iconClassName="heart-icon-big"
									/>
								) : (
									<RatingInteractive iconClassName="heart-icon-big" userId={user.id} storyId={story.id} />
								)}
							</div>
							<Link to="/share-story">
								<button className="btn btn-1 m-t-big">Share Your Story</button>
							</Link>
						</>
					)}
				</div>
			</div>
		</MainContainer>
	);
}
