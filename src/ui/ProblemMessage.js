import { ERROR_MESSAGES } from "../utils/formsAndActionsHelpers";
import MainContainer from "./MainContainer";
import styles from "./ProblemMessage.module.css";

export default function ProblemMessage({ errorCode = "not found" }) {
	return (
		<MainContainer>
			<h2 className={styles["not-found-message"]}>{ERROR_MESSAGES[errorCode]}</h2>
		</MainContainer>
	);
}
