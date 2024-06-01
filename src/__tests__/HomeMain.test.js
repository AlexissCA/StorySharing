import { screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import {
	renderWithQueryClientAndMemoryRouter,
	handlers,
	errorHandlers,
	noResourceHandlers,
	adminQueryClient,
	STORIES_MOCK,
} from "./__testUtils";
import HomeMain from "../features/main/HomeMain";

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

describe("HomeMain", () => {
	test("renders correctly with admin user", async () => {
		renderWithQueryClientAndMemoryRouter(<HomeMain />, adminQueryClient);

		const loading = screen.getByText(/loading/i);
		expect(loading).toBeInTheDocument();

		const stories = await screen.findAllByLabelText(/member icon/i);
		const buttons = screen.getAllByRole("button", { name: /delete/i });
		const filters = screen.queryByTestId("stories-filters");

		expect(stories).toHaveLength(STORIES_MOCK.length);
		expect(buttons).toHaveLength(2);
		expect(filters).not.toBeInTheDocument();
	});

	test("renders correctly with nonadmin user", async () => {
		renderWithQueryClientAndMemoryRouter(<HomeMain />);

		const stories = await screen.findAllByLabelText(/member icon/i);
		const buttons = screen.getAllByRole("link", { name: /share/i });
		const filters = screen.queryByTestId("stories-filters");

		expect(stories).toHaveLength(STORIES_MOCK.length);
		expect(buttons).toHaveLength(2);
		expect(filters).toBeInTheDocument();
	});

	test("renders connection error message when one happens", async () => {
		renderWithQueryClientAndMemoryRouter(<HomeMain />);
		server.use(...errorHandlers);

		const networkError = await screen.findByText(/try again later/i);
		expect(networkError).toBeInTheDocument();
	});

	test("renders no resource message when no resource", async () => {
		renderWithQueryClientAndMemoryRouter(<HomeMain />);
		server.use(...noResourceHandlers);

		const networkError = await screen.findByText(/no stories/i);
		expect(networkError).toBeInTheDocument();
	});
});
