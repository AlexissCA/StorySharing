import Logo from "./Logo";
import styles from "./Footer.module.css";

export default function Footer({ margin}) {
	return (
		<footer className={margin ? "" : styles["footer-noMargin"]} data-testid="footer">
			<div className="width-container flex-justified">
				<Logo className="logo-small" />
				<span>Copyright &copy; 2024 StorySharing</span>
			</div>
		</footer>
	);
}
