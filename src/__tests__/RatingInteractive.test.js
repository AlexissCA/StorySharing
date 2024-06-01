import { screen } from "@testing-library/react";
import { renderWithQueryClient } from "./__testUtils";
import RatingInteractive from "../features/story/RatingInteractive";

describe("RatingInteractive", () => {
	test("renders correctly", () => {
		renderWithQueryClient(<RatingInteractive />);

		const icons = screen.getAllByTestId("heart-icon");
		expect(icons).toHaveLength(5);
	});
});
