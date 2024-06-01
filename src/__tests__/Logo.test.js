import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithMemoryRouter } from "./__testUtils";
import Logo from "../ui/Logo";
import styles from "../ui/Logo.module.css";

const LOGO_CLASS = styles["logo"];
const LOGO_SMALL_CLASS_NAME = "logo-small";
const LOGO_SMALL_CLASS = styles["logo-small"];

describe("Logo", () => {
	test("renders correctly", () => {
		renderWithMemoryRouter(<Logo />);

		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("href", "/");
		expect(link).toHaveClass(LOGO_CLASS);
	});

	test("has correct class added", () => {
		renderWithMemoryRouter(<Logo className={LOGO_SMALL_CLASS_NAME} />);

		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("href", "/");
		expect(link).toHaveClass(LOGO_SMALL_CLASS);
		expect(link).not.toHaveClass(LOGO_CLASS);
	});

	test("unfocuses after click", async () => {
		renderWithMemoryRouter(<Logo />);

		const link = screen.getByRole("link");

		await userEvent.click(link);

		expect(link).not.toHaveFocus();
	});
});
