import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ErrorBoundary } from "react-error-boundary";
import NotFound from "./pages/NotFound";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<ErrorBoundary FallbackComponent={<NotFound errorCode="render error" />}>
			<App />
		</ErrorBoundary>
	</React.StrictMode>
);
