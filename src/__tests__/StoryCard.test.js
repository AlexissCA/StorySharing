import { screen } from "@testing-library/react";
import StoryCard from "../features/main/StoryCard";
import { renderWithQueryClientAndMemoryRouter, STORY_MOCK } from "./__testUtils";
import { formatDate } from "../utils/stringHelpers";

describe("StoryCard", () => {
	test("renders correctly", () => {
		renderWithQueryClientAndMemoryRouter(<StoryCard story={STORY_MOCK} />);

		const img = screen.getByAltText(STORY_MOCK.title);
		const title = screen.getByRole("heading", { name: STORY_MOCK.title });
		const text = screen.getByText(STORY_MOCK.text);
		const authorName = screen.getByText(STORY_MOCK.members.username);
		const storyDate = screen.getByText(formatDate(STORY_MOCK.created_at));
		const readMore = screen.getByRole("link", { name: /read more/i });

		expect(img).toBeInTheDocument();
		expect(title).toBeInTheDocument();
		expect(text).toBeInTheDocument();
		expect(authorName).toBeInTheDocument();
		expect(storyDate).toBeInTheDocument();
		expect(readMore).toBeInTheDocument();
	});

	test("correctly adds read more href", () => {
		renderWithQueryClientAndMemoryRouter(<StoryCard story={STORY_MOCK} />);

		const readMore = screen.getByRole("link", { name: /read more/i });
		expect(readMore).toHaveAttribute("href", `/story/${STORY_MOCK.id}`);
	});
});
