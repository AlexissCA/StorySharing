import { useState } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import AuthContainer from "../features/authentication/AuthContainer";
import RegisterForm from "../features/authentication/RegisterForm";

export default function Register() {
	const [isLoading, setIsLoading] = useState(false);
	useDocumentTitle("Register");

	return (
		<AuthContainer to="Login" isDisabled={isLoading}>
			<RegisterForm isLoading={isLoading} setIsLoading={setIsLoading} />
		</AuthContainer>
	);
}
