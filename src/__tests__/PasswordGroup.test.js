import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PasswordGroup from "../ui/PasswordGroup";

const ID = "test-id";
const LABEL = "Test Password";
const VALUE = "test";
const ERROR_CODE = "test code";
const ERROR_CLASS_NAME = "error-input";

describe("PasswordGroup", () => {
	test("renders correctly", () => {
		render(<PasswordGroup id={ID} label={LABEL} value={VALUE} />);

		const label = screen.getByText(LABEL);
		const input = screen.getByLabelText(LABEL);
		const svg = screen.getByTestId("eye");

		expect(label).toBeInTheDocument();
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute("type", "password");
		expect(input).not.toHaveClass(ERROR_CLASS_NAME);
		expect(svg).toBeInTheDocument();
	});

	test("adds error-input className when error passed", () => {
		render(<PasswordGroup id={ID} label={LABEL} value={VALUE} errorCode={ERROR_CODE} />);

		const input = screen.getByLabelText(LABEL);
		expect(input).toHaveClass(ERROR_CLASS_NAME);
	});

	test("toggles password visibility and change icon", async () => {
		render(<PasswordGroup id={ID} label={LABEL} value={VALUE} />);

		const input = screen.getByLabelText(LABEL);

		const svg = screen.getByTestId("eye");
		expect(svg).toBeInTheDocument();
		await userEvent.click(svg);
		expect(input).toHaveAttribute("type", "text");

		const svg2 = screen.getByTestId("eye-blocked");
		expect(svg2).toBeInTheDocument();
		await userEvent.click(svg2);
		expect(input).toHaveAttribute("type", "password");
	});
});
