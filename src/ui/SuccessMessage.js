import { SUCCESS_MESSAGES } from "../utils/formsAndActionsHelpers";
import styles from "./SuccessMessage.module.css";

export default function SuccessMessage({ margin, marginBottom, messageCode, paddingSides = 0 }) {
	return (
		<h3 className={`${styles["success-message"]}`} style={{ marginTop: margin, marginBottom: marginBottom || margin, paddingLeft: paddingSides, paddingRight: paddingSides }}>
			{SUCCESS_MESSAGES[messageCode]}
		</h3>
	);
}
