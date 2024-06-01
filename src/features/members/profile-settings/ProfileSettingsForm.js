import useProfileSettingsForm from "./useProfileSettingsForm";
import { USERNAME_INSTRUCTION, PASSWORD_CHANGE_INFO } from "../../../utils/formsAndActionsHelpers";
import MainContainer from "../../../ui/MainContainer";
import ErrorMessage from "../../../ui/ErrorMessage";
import Spinner from "../../../ui/Spinner";
import SuccessMessage from "../../../ui/SuccessMessage";
import MemberAvatar from "../../../ui/MemberAvatar";
import InputErrorMessage from "../../../ui/InputErrorMessage";
import PasswordGroup from "../../../ui/PasswordGroup";
import CheckboxGroup from "../../../ui/CheckboxGroup";
import styles from "./ProfileSettingsForm.module.css";

export default function ProfileSettingsForm() {
	const {
		imageFile,
		color,
		setColor,
		username,
		setUsername,
		usernameErrorCode,
		description,
		currentPassword,
		setCurrentPassword,
		currentPasswordErrorCode,
		newPassword,
		setNewPassword,
		newPasswordErrorCode,
		newPassword2,
		setNewPassword2,
		newPassword2ErrorCode,
		notify,
		setNotify,
		isAdmin,
		isPending,
		isConnectionError,
		isSuccess,
		textareaRef,
		handleSubmit,
		handleImageFileChange,
		handleDescriptionChange,
		clearError,
	} = useProfileSettingsForm();

	return (
		<MainContainer>
			<form className={`${styles["profile-settings-form"]} solid-bg`} onSubmit={handleSubmit} noValidate>
				<h3 className={styles["profile-settings-title"]}>Profile Settings</h3>
				{isConnectionError ? (
					<ErrorMessage margin="11rem" className={styles["profile-settings-network-error"]} />
				) : isPending ? (
					<Spinner margin="6.25rem" />
				) : isSuccess ? (
					<SuccessMessage margin="10.85rem" messageCode="settings updated" />
				) : (
					<>
						<>
							<label htmlFor="user-img-file">Change Profile Picture</label>
							<div className="img-file-input-container">
								<input
									id="user-img-file"
									name="user-img"
									type="file"
									className={styles["user-img-file"]}
									accept="image/*"
									tabIndex="-1"
									onChange={handleImageFileChange}
								/>
								<MemberAvatar img={imageFile?.url} className={styles["user-img"]} color={color} />
							</div>
							<hr className="line-separator-light" />
						</>
						<>
							<label htmlFor="user-color">Change Profile Color</label>
							<input
								id="user-color"
								name="user-color"
								type="color"
								className={styles["user-color"]}
								style={{ backgroundColor: color }}
								tabIndex="-1"
								value={color}
								onChange={e => setColor(e.target.value)}
							/>
							<hr className="line-separator-light" />
						</>
						<>
							<label htmlFor="username">
								Change Username<span className="info">{USERNAME_INSTRUCTION}</span>
							</label>
							<input
								id="username"
								name="username"
								type="text"
								className={usernameErrorCode ? "error-input" : ""}
								minLength="3"
								maxLength="20"
								value={username}
								onChange={e => setUsername(e.target.value)}
								onFocus={clearError}
							/>
							<InputErrorMessage errorCode={usernameErrorCode} />
							<hr className="line-separator-light m-t-negative-s" />
						</>
						<>
							<label htmlFor="description">Change User Description</label>
							<textarea
								id="description"
								name="description"
								className="textarea"
								value={description}
								onChange={handleDescriptionChange}
								ref={textareaRef}></textarea>
							<hr className="line-separator-strong" />
						</>
						{
							// blocking admin password change for testing purposes -couldn't do proper DB testing reset, as Admin is never being removed from DB and is never signed up again,
							// also propably password change should be done through email
							!isAdmin && (
								<>
									<h4 className="title-small">Change Password</h4>
									<PasswordGroup
										id="current-password"
										label="Current Password"
										errorCode={currentPasswordErrorCode}
										onChange={e => setCurrentPassword(e.target.value)}
										onFocus={clearError}
										instructions={true}
										info={PASSWORD_CHANGE_INFO}
										value={currentPassword}
									/>
									<PasswordGroup
										id="new-password"
										label="New Password"
										errorCode={newPasswordErrorCode}
										onChange={e => setNewPassword(e.target.value)}
										onFocus={clearError}
										instructions={true}
										value={newPassword}
									/>
									<PasswordGroup
										id="new-password2"
										label="Confirm New Password"
										errorCode={newPassword2ErrorCode}
										onChange={e => setNewPassword2(e.target.value)}
										value={newPassword2}
										onFocus={clearError}
									/>
									<hr className="line-separator-strong m-t-big" />
								</>
							)
						}

						<CheckboxGroup
							id="notify"
							label="Notify me"
							checked={notify}
							className={styles["profile-settings-checkbox-group"]}
							toggleNotify={() => setNotify(st => !st)}
						/>
						<input type="submit" className={`btn btn-2 ${styles["profile-settings-save-btn"]}`} value="Save Changes" />
					</>
				)}
			</form>
		</MainContainer>
	);
}
