import { CONFIRMATION_MESSAGES } from "../utils/formsAndActionsHelpers";
import PopupWindowSmall from "./PopupWindowSmall";
import ErrorMessage from "./ErrorMessage";
import Spinner from "./Spinner";
import styles from "./ConfirmActionPopup.module.css";

export default function ConfirmActionPopup({ messageCode, buttonLabel, hook, mutateProps = {}, closeRef, popupRef }) {
	const { isPending, isConnectionError, mutate } = hook();

	return (
		<PopupWindowSmall popupRef={popupRef} closeRef={closeRef}>
			<div>
				{isConnectionError ? (
					<ErrorMessage margin="10.7rem" marginBottom="7rem" />
				) : isPending ? (
					<Spinner margin="7.84rem" marginBottom="3rem" />
				) : (
					<>
						<h3 className={styles["confirm-message"]}>{CONFIRMATION_MESSAGES[messageCode]}</h3>
						<button className="btn btn-2" onClick={() => mutate(mutateProps)}>
							{buttonLabel}
						</button>
					</>
				)}
			</div>
		</PopupWindowSmall>
	);
}
