import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import SpinnerOverlay from "./SpinnerOverlay";
import { Outlet, useNavigate } from "react-router-dom";

export default function ProtectedRoutes() {
	const navigate = useNavigate();
	const { isAuthenticated, isPending} = useUser();

	useEffect(() => {
		if (!isPending && !isAuthenticated) navigate("/login");
	}, [isPending, isAuthenticated, navigate]);

	if (isPending) return <SpinnerOverlay />;

	if (isAuthenticated) return <Outlet />;
}
