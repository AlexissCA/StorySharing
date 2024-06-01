import { render } from "@testing-library/react";
import ErrorMessage from "../ui/ErrorMessage";

test("ErrorMessage renders without crashing", () => {
	render(<ErrorMessage />);
});
