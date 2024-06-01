import { screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import {
	renderWithQueryClientAndMemoryRouter,
	handlers,
	errorHandlers,
	notFoundHandlers,
	STORY_ID,
	STORY_MOCK,
	adminQueryClient,
	authorQueryClient,
} from "./__testUtils";
import StoryDetails from "../features/story/StoryDetails";

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useParams: () => ({ id: 7 }), // STORY_ID
}));

const server = setupServer(...handlers);
beforeAll(() => {
	server.listen();
});
afterEach(() => {
	server.resetHandlers();
});
afterAll(() => {
	server.close();
});

describe("StoryDetails", () => {
	test("renders correctly", async () => {
		renderWithQueryClientAndMemoryRouter(<StoryDetails />, adminQueryClient);

		const loading = await screen.findByText(/loading/i);
		expect(loading).toBeInTheDocument();
		const storyTitle = await screen.findByText(STORY_MOCK.title);
		expect(storyTitle).toBeInTheDocument();
	});

	test("renders 'Share New Story' button for author user", async () => {
		renderWithQueryClientAndMemoryRouter(<StoryDetails />, authorQueryClient);

		const shareButton = await screen.findByText(/share new story/i);
		expect(shareButton).toBeInTheDocument();
	});

	test("renders 'Delete Story' button for admin user", async () => {
		renderWithQueryClientAndMemoryRouter(<StoryDetails />, adminQueryClient);

		const shareButton = await screen.findByText(/delete story/i);
		expect(shareButton).toBeInTheDocument();
	});

	test("renders 'Share Your story' button for nonadmin and nonauthor user", async () => {
		renderWithQueryClientAndMemoryRouter(<StoryDetails />);

		const shareButton = await screen.findByText(/share your story/i);
		expect(shareButton).toBeInTheDocument();
	});

	test("renders not found message when no resource", async () => {
		renderWithQueryClientAndMemoryRouter(<StoryDetails />, adminQueryClient);
		server.use(...notFoundHandlers);

		const notFoundMessage = await screen.findByText(/not found/i);
		expect(notFoundMessage).toBeInTheDocument();
	});

	test("renders connection error message when one happens", async () => {
		renderWithQueryClientAndMemoryRouter(<StoryDetails />, adminQueryClient);
		server.use(...errorHandlers);

		const networkError = await screen.findByText(/try again later/i);
		expect(networkError).toBeInTheDocument();
	});
});
