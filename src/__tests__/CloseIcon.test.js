import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CloseIcon from "../ui/CloseIcon";

const ON_CLICK_FN_MOCK = jest.fn();
const CLASS_NAME = "test-class";
beforeEach(() => {
	ON_CLICK_FN_MOCK.mockClear();
});

describe("CloseIcon", () => {
	test("renders correctly", () => {
		render(<CloseIcon />);

		const icon = screen.getByTestId("close-icon");
		expect(icon).toBeInTheDocument();
	});

	test("has additional class added", () => {
		render(<CloseIcon className={CLASS_NAME} />);

		const icon = screen.getByTestId("close-icon");
		expect(icon).toHaveClass(CLASS_NAME);
	});

	test("calls onClick when clicked", async () => {
		render(<CloseIcon onClick={ON_CLICK_FN_MOCK} />);

		const icon = screen.getByTestId("close-icon");

		await userEvent.click(icon);

		expect(ON_CLICK_FN_MOCK).toHaveBeenCalledTimes(1);
	});
});
