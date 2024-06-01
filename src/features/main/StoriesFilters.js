import { Link } from "react-router-dom";
import styles from "./StoriesFilters.module.css";

export default function StoriesFilters({ sortByTopRated, filterMine }) {
	function buildLink(sortType, isFilter) {
		let link = "/";
		if (sortType) link += "?sortBy=toprated";
		if (isFilter) link += (sortType ? "&" : "?") + "filter=mine";
		return link;
	}

	return (
		<div className={styles["stories-filters"]} data-testid="stories-filters">
			<div className={styles["filter-type"]}>
				<Link
					to={buildLink(false, filterMine)}
					className={`${styles["option"]} ${!sortByTopRated ? styles["option-chosen"] : ""}`}
					data-testid="stories-filter-option">
					Newest
				</Link>
				<Link
					to={buildLink(true, filterMine)}
					className={`${styles["option"]} ${sortByTopRated ? styles["option-chosen"] : ""}`}
					data-testid="stories-filter-option">
					Top-Rated
				</Link>
			</div>
			<div className={styles["filter-type"]}>
				<Link
					to={buildLink(sortByTopRated, false)}
					className={`${styles["option"]} ${!filterMine ? styles["option-chosen"] : ""}`}
					data-testid="stories-filter-option">
					All
				</Link>
				<Link
					to={buildLink(sortByTopRated, true)}
					className={`${styles["option"]} ${filterMine ? styles["option-chosen"] : ""}`}
					data-testid="stories-filter-option">
					Mine
				</Link>
			</div>
		</div>
	);
}
