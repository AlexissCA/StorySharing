import { useState } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import AuthContainer from "../features/authentication/AuthContainer";
import LoginForm from "../features/authentication/LoginForm";

export default function Login() {
	const [isLoading, setIsLoading] = useState(false);
	useDocumentTitle("Login");

	return (
		<AuthContainer to="Register" isDisabled={isLoading}>
			<LoginForm isLoading={isLoading} setIsLoading={setIsLoading} />
		</AuthContainer>
	);
}
