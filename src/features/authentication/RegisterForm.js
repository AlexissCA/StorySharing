import useRegister from "./useRegister";
import { USERNAME_INSTRUCTION, MIN_LENGTH, MAX_USERNAME_LENGTH } from "../../utils/formsAndActionsHelpers";
import ErrorMessage from "../../ui/ErrorMessage";
import Spinner from "../../ui/Spinner";
import InputErrorMessage from "../../ui/InputErrorMessage";
import PasswordGroup from "../../ui/PasswordGroup";
import styles from "./AuthForm.module.css";
import SuccessMessage from "../../ui/SuccessMessage";

export default function RegisterForm({ isLoading, setIsLoading }) {
	const {
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
		ref,
		handleSubmit,
		handleChange,
		clearError,
	} = useRegister();

	if (isConnectionError) return <ErrorMessage margin={"25.55rem"} />;
	if (isSent) return <SuccessMessage margin={"23.7rem"} messageCode="registration success" paddingSides={"2.4rem"} />;
	if (isLoading) return <Spinner margin="22.05rem" />;

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
			<>
				<label htmlFor="username">
					Username*<span className="info">{USERNAME_INSTRUCTION}</span>
				</label>
				<input
					id="username"
					name="username"
					type="text"
					className={usernameErrorCode ? "error-input" : ""}
					minLength={MIN_LENGTH}
					maxLength={MAX_USERNAME_LENGTH}
					value={username}
					onChange={handleChange}
					onFocus={clearError}
				/>
				<InputErrorMessage errorCode={usernameErrorCode} />
			</>
			<PasswordGroup
				id="password"
				label="Password*"
				value={password}
				onChange={handleChange}
				onFocus={clearError}
				errorCode={passwordErrorCode}
				instructions={true}
				type="new"
			/>
			<PasswordGroup
				id="password2"
				label="Confirm Password*"
				value={password2}
				onChange={handleChange}
				onFocus={clearError}
				errorCode={password2ErrorCode}
				type="new"
			/>
			<input type="submit" value="Register" ref={ref} className={`btn btn-1 ${styles["auth-submit-btn"]}`} />
		</form>
	);
}
