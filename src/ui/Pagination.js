import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { STORIES_PER_PAGE } from "../utils/constants";
import styles from "./Pagination.module.css";

export default function Pagination({ count }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const page = searchParams.get("page");
	const totalPages = Math.ceil(count / STORIES_PER_PAGE);

	useEffect(() => {
		if (!page) {
			setSearchParams(searchParams => {
				searchParams.set("page", 1);
				return searchParams;
			});
		}
	}, [page, setSearchParams]);

	function nextPage() {
		searchParams.set("page", page === totalPages ? page : +page + 1);
		setSearchParams(searchParams);
	}
	function previousPage() {
		searchParams.set("page", page === 1 ? page : page - 1);
		setSearchParams(searchParams);
	}

	return (
		<div className={styles["pagination"]}>
			<button onClick={previousPage} disabled={page == 1}>
				<span>&lt;</span> Previous
			</button>
			<p>
				Showing <span>{(page - 1) * STORIES_PER_PAGE + 1}</span> to{" "}
				<span>{page == totalPages ? count : page * STORIES_PER_PAGE}</span> of <span>{count}</span> results
			</p>
			<button onClick={nextPage} disabled={page == totalPages}>
				Next <span>&gt;</span>
			</button>
		</div>
	);
}
