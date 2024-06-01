import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../../features/authentication/useUser.js";
import { useGetStories } from "./useStories.js";
import MainContainer from "../../ui/MainContainer.js";
import ErrorMessage from "../../ui/ErrorMessage.js";
import Spinner from "../../ui/Spinner.js";
import NoResourcesMessage from "../../ui/NoResourcesMessage.js";
import StoriesFilters from "./StoriesFilters.js";
import StoryCard from "./StoryCard.js";
import { STORIES_PER_PAGE } from "../../utils/constants.js";
import Pagination from "../../ui/Pagination.js";
import DeleteAllStories from "./DeleteAllStories.js";
import styles from "./HomeMain.module.css";

export default function HomeMain() {
	const { user } = useUser();
	const navigate = useNavigate();
	const { stories, count, isPending, isConnectionError, sortByTopRated, filterMine, page } = useGetStories(user.id);
	const lastPage = Math.ceil(count / STORIES_PER_PAGE);
	const isOutOfBoundsPage = page > 1 && page > lastPage;

	useEffect(() => {
		if (isOutOfBoundsPage) navigate("/");
	}, [isOutOfBoundsPage, navigate]);

	if (isConnectionError) {
		return (
			<MainContainer>
				<ErrorMessage margin="11.8rem" />
			</MainContainer>
		);
	}

	if (isPending || isOutOfBoundsPage) {
		return (
			<MainContainer>
				<Spinner margin="5.85rem" />
			</MainContainer>
		);
	}
	if (!stories.length) {
		return (
			<MainContainer>
				<NoResourcesMessage
					margin={user.is_admin ? "10.95rem" : "8.85rem"}
					messageCode={!user.is_admin && filterMine && page == 1 ? "no user stories" : "no stories"}
				/>
				{!user.is_admin && <MainButton isAdmin={user.is_admin} />}
			</MainContainer>
		);
	}

	return (
		<MainContainer>
			<MainButton isAdmin={user.is_admin} />
			{!user.is_admin && <StoriesFilters sortByTopRated={sortByTopRated} filterMine={filterMine} />}
			<section className={styles["stories"]}>
				{stories.map(a => (
					<StoryCard key={a.id} story={a} />
				))}
			</section>
			{count > STORIES_PER_PAGE && <Pagination count={count} />}
			<MainButton isAdmin={user.is_admin} className="m-t-small" />
		</MainContainer>
	);
}

function MainButton({ isAdmin, className = "" }) {
	if (isAdmin) return <DeleteAllStories className={className} />;

	return (
		<button className={`btn btn-1 ${className}`}>
			<Link to="/share-story" tabIndex="-1">
				Share Story
			</Link>
		</button>
	);
}
