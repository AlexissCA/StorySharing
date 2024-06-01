import { ERROR_MESSAGES, ERROR_PLACEHOLDER } from "../utils/formsAndActionsHelpers";

export default function InputErrorMessage({ errorCode }) {
	return <small className={`error-msg ${errorCode ? "visible" : ""}`}>{ERROR_MESSAGES[errorCode] || ERROR_PLACEHOLDER}</small>;
}
