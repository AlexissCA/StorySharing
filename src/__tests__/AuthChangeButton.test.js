import { screen } from "@testing-library/react";
import { renderWithMemoryRouter } from "./__testUtils";
import AuthChangeButton from "../features/authentication/AuthChangeButton";

const TO = "register";

describe("AuthChangeButton", () => {
	test("renders button with correct text", () => {
		renderWithMemoryRouter(<AuthChangeButton to={TO} />);

		const button = screen.getByText(new RegExp(TO, "i"));
		expect(button).toBeInTheDocument();
	});

	test("renders link with correct href attribute", () => {
		renderWithMemoryRouter(<AuthChangeButton to={TO} />);

		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("href", `/${TO}`);
	});

	test("renders link with default href attribute when to is not provided", () => {
		renderWithMemoryRouter(<AuthChangeButton />);

		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("href", `/`);
	});

	test("renders enabled button when isDisabled is false", () => {
		renderWithMemoryRouter(<AuthChangeButton to={TO} />);

		const button = screen.getByRole("button");
		expect(button).not.toBeDisabled();
	});

	test("renders disabled button when isDisabled is true", () => {
		renderWithMemoryRouter(<AuthChangeButton to={TO} isDisabled={true} />);

		const button = screen.getByRole("button");
		expect(button).toBeDisabled();
	});
});
