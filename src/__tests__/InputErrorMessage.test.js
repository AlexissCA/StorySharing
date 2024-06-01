import { render, screen } from "@testing-library/react";
import { ERROR_MESSAGES, ERROR_PLACEHOLDER } from "../utils/formsAndActionsHelpers";
import InputErrorMessage from "../ui/InputErrorMessage";

describe("InputErrorMessage", () => {
	test("is visible and displays message when known error code is passed", () => {
		render(<InputErrorMessage errorCode={"email empty"} />);

		const message = screen.getByText(ERROR_MESSAGES["email empty"]);
		expect(message).toBeInTheDocument();
		expect(message).toHaveClass("visible");
	});

	test("is not visible and it's textContent has placeholder error", () => {
		render(<InputErrorMessage />);

		const message = screen.getByText(ERROR_PLACEHOLDER);
		expect(message).toBeInTheDocument();
		expect(message).not.toHaveClass("visible");
	});
});
