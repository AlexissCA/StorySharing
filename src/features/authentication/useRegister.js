import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "./useLogin";
import { useAddMembers } from "../members/useMembers";
import { isInvitedMember, deleteInvitation } from "../../services/apiInviteMember";
import { NOTIFICATION_MESSAGE_DURATION } from "../../utils/constants";
import { isValidEmail, isValidUsernameLength, isValidPassword } from "../../utils/formsAndActionsHelpers";

export default function useRegister() {
	const {
		email,
		setEmail,
		emailErrorCode,
		setEmailErrorCode,
		password,
		setPassword,
		passwordErrorCode,
		setPasswordErrorCode,
		isConnectionError,
		setIsConnectionError,
		ref,
		looseFocus,
	} = useLogin();
	const [username, setUsername] = useState("");
	const [usernameErrorCode, setUsernameErrorCode] = useState(null);
	const [password2, setPassword2] = useState("");
	const [password2ErrorCode, setPassword2ErrorCode] = useState(null);
	const [isSent, setIsSent] = useState(false);
	const navigate = useNavigate();
	const { mutateAsync: registerMember } = useAddMembers(onRegistrationSuccess, onRegistrationError);
	const timeoutNetworkErrorIdRef = useRef(null);

	useEffect(() => {
		return () => {
			if (timeoutNetworkErrorIdRef?.current) clearTimeout(timeoutNetworkErrorIdRef.current);
		};
	}, []);

	async function handleSubmit(e, setIsLoading) {
		e.preventDefault();
		looseFocus();

		const isFieldError = validateFields();

		if (!isFieldError) {
			setIsLoading(true);

			const isInvited = await checkIfIsInvited();
			if (!isInvited) {
				setIsLoading(false);
				return;
			}

			await registerMember([
				{
					member: { username, email, is_admin: false },
					imageFile: "",
					userAuthData: {
						password,
						email,
					},
				},
			]);

			setIsLoading(false);
		}
	}

	function onRegistrationSuccess() {
		deleteInvitation(email);
		navigate("/"); // FOR TESTING
		// setIsSent(true); // REAL PROJECT:
	}

	function onRegistrationError() {
		setIsConnectionError(true);
	}

	async function checkIfIsInvited() {
		try {
			const isInvited = await isInvitedMember(email);
			if (!isInvited) {
				onIsNotInvited();
				return false;
			} else return true;
		} catch (e) {
			onConnectionError();
			return false;
		}
	}

	function onIsNotInvited() {
		setEmailErrorCode("register email backend");
	}

	function onConnectionError() {
		setIsConnectionError(true);
		timeoutNetworkErrorIdRef.current = setTimeout(() => setIsConnectionError(false), NOTIFICATION_MESSAGE_DURATION);
	}

	function validateFields() {
		let isError = false;
		if (!email) {
			setEmailErrorCode("email empty");
			isError = true;
		} else if (!isValidEmail(email)) {
			setEmailErrorCode("email invalid");
			isError = true;
		}

		if (!username) {
			setUsernameErrorCode("username empty");
			isError = true;
		} else if (!isValidUsernameLength(username)) {
			setUsernameErrorCode("username invalid");
			isError = true;
		}

		if (!password) {
			setPasswordErrorCode("password empty");
			isError = true;
		} else if (!isValidPassword(password)) {
			setPasswordErrorCode("password invalid");
			isError = true;
		}

		if (!password2) {
			setPassword2ErrorCode("password2 empty");
			isError = true;
		} else if (!isValidPassword(password2)) {
			setPassword2ErrorCode("password invalid");
			isError = true;
		}

		if (password !== password2) {
			setPassword2ErrorCode("passwords unmatched");
			isError = true;
		}

		return isError;
	}

	function handleChange(e) {
		const type = e.target.name;
		const value = e.target.value;
		if (type === "email") setEmail(value);
		else if (type === "username") setUsername(value);
		else if (type === "password") setPassword(value);
		else if (type === "password2") setPassword2(value);
	}

	function clearError(e) {
		const type = e.target.name;
		if (type === "email") setEmailErrorCode("");
		else if (type === "username") setUsernameErrorCode("");
		else if (type === "password") setPasswordErrorCode("");
		else if (type === "password2") setPassword2ErrorCode("");
	}

	return {
		email,
		emailErrorCode,
		username,
		usernameErrorCode,
		password,
		passwordErrorCode,
		password2,
		password2ErrorCode,
		isConnectionError,
		isSent,
		handleSubmit,
		handleChange,
		clearError,
		ref,
	};
}
