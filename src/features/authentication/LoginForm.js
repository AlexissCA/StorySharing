import useLogin from "./useLogin";
import ErrorMessage from "../../ui/ErrorMessage";
import Spinner from "../../ui/Spinner";
import InputErrorMessage from "../../ui/InputErrorMessage";
import PasswordGroup from "../../ui/PasswordGroup";
import styles from "./AuthForm.module.css";

export default function LoginForm({ isLoading, setIsLoading }) {
	const {
		email,
		emailErrorCode,
		password,
		passwordErrorCode,
		passwordInstruction,
		isConnectionError,
		ref,
		handleSubmit,
		handleChange,
		clearError,
	} = useLogin();

	if (isConnectionError) return <ErrorMessage margin={"16.28rem"} />;
	if (isLoading) return <Spinner margin="12.75rem" />;

	return (
		<form className={styles["auth-form"]} onSubmit={e => handleSubmit(e, setIsLoading)} noValidate>
			<>
				<label htmlFor="email">Email*</label>
				<input
					id="email"
					name="email"
					type="email"
					className={emailErrorCode ? "error-input" : ""}
					autoComplete="email"
					value={email}
					onChange={handleChange}
					onFocus={clearError}
				/>
				<InputErrorMessage errorCode={emailErrorCode} />
			</>
			<PasswordGroup
				id="password"
				label="Password*"
				value={password}
				autoComplete="current-password"
				onChange={handleChange}
				onFocus={clearError}
				errorCode={passwordErrorCode}
				instructions={passwordInstruction}
			/>
			<input type="submit" value="Login" ref={ref} className={`btn btn-1 ${styles["auth-submit-btn"]}`} />
		</form>
	);
}
