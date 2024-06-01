import { useState, useEffect, useRef } from "react";
import { useUser } from "../../../features/authentication/useUser";
import { useUpdateMember } from "../useMembers";
import useHandleTextArea from "../../../hooks/useHandleTextarea";
import { isValidUsernameLength, isValidPassword } from "../../../utils/formsAndActionsHelpers";
import { COLOR_PRIMARY, NOTIFICATION_MESSAGE_DURATION } from "../../../utils/constants";
import { extractImageFileNameFromUrl } from "../../../utils/imageFilesHelpers";

export default function useProfileSettingsForm() {
	const { user } = useUser();
	const [imageFile, setImageFile] = useState({ url: user.img_url });
	const [color, setColor] = useState(user.color || COLOR_PRIMARY);
	const [username, setUsername] = useState(user.username);
	const [usernameErrorCode, setUsernameErrorCode] = useState("");
	const [description, setDescription] = useState(user.description || "");
	const [currentPassword, setCurrentPassword] = useState("");
	const [currentPasswordErrorCode, setCurrentPasswordErrorCode] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [newPasswordErrorCode, setNewPasswordErrorCode] = useState("");
	const [newPassword2, setNewPassword2] = useState("");
	const [newPassword2ErrorCode, setNewPassword2ErrorCode] = useState("");
	const [notify, setNotify] = useState(user?.notify);
	const [isSuccess, setIsSuccess] = useState(false);
	const [isConnectionError, setIsConnectionError] = useState(false);
	const timeoutSuccessIdRef = useRef(null);
	const timeoutNetworkErrorIdRef = useRef(null);
	const { isPending, mutate: updateMember } = useUpdateMember(onSuccess, onError);
	const [textareaRef, handleTextareaHeight] = useHandleTextArea([isPending, isSuccess, isConnectionError]);

	useEffect(() => {
		return () => {
			if (timeoutSuccessIdRef?.current) clearTimeout(timeoutSuccessIdRef.current);
			if (timeoutNetworkErrorIdRef?.current) clearTimeout(timeoutNetworkErrorIdRef.current);
		};
	}, []);

	async function handleSubmit(e) {
		e.preventDefault();
		const isFieldError = validateFields();

		if (!isFieldError && areDifferences()) {
			const updatedUser = { id: user.id, color, username, description, notify };
			const passwordData = newPassword
				? { current_plain_password: currentPassword, new_plain_password: newPassword, current_id: user.uid }
				: null;
			updateMember({ member: updatedUser, imageFile, passwordData });
		}
	}

	function onSuccess() {
		setIsSuccess(true);
		timeoutSuccessIdRef.current = setTimeout(() => setIsSuccess(false), NOTIFICATION_MESSAGE_DURATION);
	}

	function onError(errorMessage) {
		if (errorMessage === "incorrect") {
			setCurrentPasswordErrorCode("password backend");
		} else {
			setIsConnectionError(true);
			timeoutNetworkErrorIdRef.current = setTimeout(() => setIsConnectionError(false), NOTIFICATION_MESSAGE_DURATION);
		}
	}

	function validateFields() {
		let isError = false;
		if (!username) {
			setUsernameErrorCode("username empty");
			isError = true;
		} else if (!isValidUsernameLength(username)) {
			setUsernameErrorCode("username invalid");
			isError = true;
		}

		if (currentPassword || newPassword || newPassword2) {
			if (!currentPassword) {
				setCurrentPasswordErrorCode("password empty");
				isError = true;
			} else if (!isValidPassword(currentPassword)) {
				setCurrentPasswordErrorCode("password invalid");
				isError = true;
			}

			if (!newPassword) {
				setNewPasswordErrorCode("password empty");
				isError = true;
			} else if (!isValidPassword(newPassword)) {
				setNewPasswordErrorCode("password invalid");
				isError = true;
			}

			let wasNewPassword2Error = false;
			if (!newPassword2) {
				setNewPassword2ErrorCode("password2 empty");
				wasNewPassword2Error = true;
				isError = true;
			} else if (!isValidPassword(newPassword2)) {
				setNewPassword2ErrorCode("password invalid");
				wasNewPassword2Error = true;
				isError = true;
			}

			if (!wasNewPassword2Error && newPassword !== newPassword2) {
				setNewPassword2ErrorCode("passwords unmatched");
				isError = true;
			}
		}
		return isError;
	}

	function areDifferences() {
		if (
			user.username !== username ||
			user.description !== description ||
			(imageFile.name && extractImageFileNameFromUrl(user.img_url) !== imageFile.name) ||
			user.color !== color ||
			user.notify !== notify ||
			currentPassword !== newPassword
		)
			return true;
	}

	function handleImageFileChange(e) {
		const file = e.target.files[0];
		file.url = URL.createObjectURL(file);
		setImageFile(file);
	}

	function handleDescriptionChange(e) {
		setDescription(e.target.value);
		handleTextareaHeight();
	}

	function clearError(e) {
		const type = e.target.name;
		if (type === "username") setUsernameErrorCode("");
		else if (type === "current-password" || type === "new-password" || type === "new-password2") {
			setCurrentPasswordErrorCode("");
			setNewPasswordErrorCode("");
			setNewPassword2ErrorCode("");
		}
	}

	return {
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
		setNewPassword2ErrorCode,
		notify,
		setNotify,
		isAdmin: user?.is_admin,
		isPending,
		isConnectionError,
		isSuccess,
		textareaRef,
		handleSubmit,
		handleImageFileChange,
		handleDescriptionChange,
		clearError,
	};
}
