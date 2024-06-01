import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginApi, useLogout } from "./useUser";
import useUnfocus from "../../hooks/useUnfocus";
import { NOTIFICATION_MESSAGE_DURATION } from "../../utils/constants";
import { isValidEmail, isValidPassword } from "../../utils/formsAndActionsHelpers";

export default function useLogin() {
	const [email, setEmail] = useState("");
	const [emailErrorCode, setEmailErrorCode] = useState(null);
	const [password, setPassword] = useState("");
	const [passwordErrorCode, setPasswordErrorCode] = useState(null);
	const [passwordInstruction, setPasswordInstruction] = useState(false);
	const [isConnectionError, setIsConnectionError] = useState(false);
	const navigate = useNavigate();
	const { mutateAsync: login } = useLoginApi(onLoginSuccess, onLoginError);
	const { mutate: logout } = useLogout();
	const [ref, looseFocus] = useUnfocus();
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

			try {
				await login({ email, password });
			} catch (e) {}

			setIsLoading(false);
		}
	}

	function onLoginSuccess() {
		navigate("/", { replace: true });
	}

	function onLoginError(errorMessage) {
		if (errorMessage === "invalid_credentials") {
			setEmailErrorCode("login backend");
			setPasswordErrorCode("login backend");
		} else {
			setIsConnectionError(true);
			timeoutNetworkErrorIdRef.current = setTimeout(() => setIsConnectionError(false), NOTIFICATION_MESSAGE_DURATION);
		}
		logout();
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

		if (!password) {
			setPasswordErrorCode("password empty");
			isError = true;
		} else if (!isValidPassword(password)) {
			setPasswordInstruction(true);
			setPasswordErrorCode("password invalid");
			isError = true;
		}
		return isError;
	}

	function handleChange(e) {
		const type = e.target.name;
		const value = e.target.value;
		if (type === "email") setEmail(value);
		else if (type === "password") setPassword(value);
	}

	function clearError(e) {
		const type = e.target.name;
		if (type === "email") setEmailErrorCode("");
		else if (type === "password") {
			setPasswordErrorCode("");
			setPasswordInstruction(false);
		}
	}

	return {
		email,
		setEmail,
		emailErrorCode,
		setEmailErrorCode,
		password,
		setPassword,
		passwordErrorCode,
		setPasswordErrorCode,
		passwordInstruction,
		isConnectionError,
		setIsConnectionError,
		ref,
		handleSubmit,
		handleChange,
		clearError,
		looseFocus,
	};
}
