import { screen } from "@testing-library/react";
import { renderWithMemoryRouter } from "./__testUtils";
import Footer from "../ui/Footer";
import styles from "../ui/Footer.module.css";

const CLASS = styles["footer-noMargin"];

describe("Footer", () => {
	test("renders correctly", () => {
		renderWithMemoryRouter(<Footer />);

		const elements = screen.getAllByText(/storysharing/i);
		expect(elements).toHaveLength(2);
		const footer = screen.getByTestId("footer");
		expect(footer).toHaveClass(CLASS);
	});

	test("adds class when margin true", () => {
		renderWithMemoryRouter(<Footer margin={true} />);

		const footer = screen.getByTestId("footer");
		expect(footer).not.toHaveClass(CLASS);
	});
});
