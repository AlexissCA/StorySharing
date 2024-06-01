import { MESSAGES } from "../utils/formsAndActionsHelpers";
import styles from "./NoResourcesMessage.module.css";

export default function NoResourcesMessage({ margin, messageCode }) {
	return (
		<h3 className={`${styles["no-resources-message"]}`} style={{ marginTop: margin, marginBottom: margin }}>
			{MESSAGES[messageCode]}
		</h3>
	);
}
