import { screen } from "@testing-library/react";
import { renderWithMemoryRouter } from "./__testUtils";
import StoriesFilters from "../features/main/StoriesFilters";
import styles from "../features/main/StoriesFilters.module.css";

const OPTION_CHOSEN_CLASS = styles["option-chosen"];
const DATA_TEST_ID = "stories-filter-option";

describe("StoriesFilters", () => {
	test("renders correctly", () => {
		renderWithMemoryRouter(<StoriesFilters />);

		const links = screen.getAllByTestId(DATA_TEST_ID);
		expect(links).toHaveLength(4);
	});

	test("renders correctly with sortBy newest and filter", () => {
		renderWithMemoryRouter(<StoriesFilters sortByTopRated={false} filterMine={true} />);

		const links = screen.getAllByTestId(DATA_TEST_ID);
		expect(links[0]).toHaveClass(OPTION_CHOSEN_CLASS);
		expect(links[1]).not.toHaveClass(OPTION_CHOSEN_CLASS);
		expect(links[2]).not.toHaveClass(OPTION_CHOSEN_CLASS);
		expect(links[3]).toHaveClass(OPTION_CHOSEN_CLASS);
	});

	test("renders correctly with sortBy toprated and no filter", () => {
		renderWithMemoryRouter(<StoriesFilters sortByTopRated={true} />);

		const links = screen.getAllByTestId(DATA_TEST_ID);
		expect(links[0]).not.toHaveClass(OPTION_CHOSEN_CLASS);
		expect(links[1]).toHaveClass(OPTION_CHOSEN_CLASS);
		expect(links[2]).toHaveClass(OPTION_CHOSEN_CLASS);
		expect(links[3]).not.toHaveClass(OPTION_CHOSEN_CLASS);
	});
});
