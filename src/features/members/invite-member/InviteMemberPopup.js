import useInviteMember from "./useInviteMember";
import PopupWindowSmall from "../../../ui/PopupWindowSmall";
import ErrorMessage from "../../../ui/ErrorMessage";
import Spinner from "../../../ui/Spinner";
import SuccessMessage from "../../../ui/SuccessMessage";
import InputErrorMessage from "../../../ui/InputErrorMessage";
import styles from "./InviteMemberPopup.module.css";

export default function InviteMemberPopup({ popupRef, closeRef, closePopup }) {
	const {
		email,
		setEmail,
		emailErrorCode,
		setEmailErrorCode,
		isLoading,
		isConnectionError,
		isAlreadyAMemberError,
		isAlreadyInvitedError,
		isSent,
		ref,
		handleSubmit,
		looseFocus,
	} = useInviteMember();

	return (
		<PopupWindowSmall popupRef={popupRef} closeRef={closeRef}>
			<form onSubmit={e => handleSubmit(e, closePopup)} noValidate>
				<h2 className={styles["invite-popup-title"]}>Invite Friend</h2>
				{isConnectionError || isAlreadyAMemberError || isAlreadyInvitedError ? (
					isConnectionError ? (
						<ErrorMessage margin="7.53rem" />
					) : (
						<ErrorMessage margin="7.53rem" messageCode={isAlreadyAMemberError ? "member already registered" : "member already invited"} />
					)
				) : isLoading ? (
					<Spinner margin="2.7rem" />
				) : isSent ? (
					<SuccessMessage margin="7.53rem" messageCode="invitation sent" />
				) : (
					<>
						<label htmlFor="friend-email">Email</label>
						<input
							id="friend-email"
							type="email"
							className={emailErrorCode ? "error-input" : ""}
							value={email}
							onChange={e => setEmail(e.target.value)}
							onFocus={() => setEmailErrorCode("")}
						/>
						<InputErrorMessage errorCode={emailErrorCode} />
						<input type="submit" value="Send Invitation" className="btn btn-1" ref={ref} onClick={looseFocus} disabled={isLoading} />
					</>
				)}
			</form>
		</PopupWindowSmall>
	);
}
