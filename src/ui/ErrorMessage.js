import { ERROR_MESSAGES } from "../utils/formsAndActionsHelpers";
import styles from "./ErrorMessage.module.css";

export default function ErrorMessage({ margin, marginBottom, messageCode = "general backend error" }) {
	return (
		<h3 className={`${styles["error-message"]}`} style={{ marginTop: margin, marginBottom: marginBottom || margin }}>
			{ERROR_MESSAGES[messageCode]}
		</h3>
	);
}
