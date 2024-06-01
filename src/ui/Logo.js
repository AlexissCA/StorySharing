import { Link } from "react-router-dom";
import useUnfocus from "../hooks/useUnfocus";
import styles from "./Logo.module.css";

export default function Logo({ className = "logo" }) {
	const [ref, looseFocus] = useUnfocus();

	return (
		<Link to="/" className={styles[className]} ref={ref} onFocus={looseFocus}>
			StorySharing
		</Link>
	);
}
