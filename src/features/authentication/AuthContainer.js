import AuthLogo from "./AuthLogo";
import AuthChangeButton from "./AuthChangeButton";
import styles from "./AuthContainer.module.css";

export default function AuthContainer({ children, to, isDisabled }) {
	return (
		<div className="center-on-page">
			<div className={styles["auth-container"]}>
				<AuthLogo />
				{children}
				<AuthChangeButton to={to} isDisabled={isDisabled} />
			</div>
		</div>
	);
}
