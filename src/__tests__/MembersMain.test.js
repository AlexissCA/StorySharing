import { screen, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";
import { renderWithQueryClientAndMemoryRouter, handlers, errorHandlers, adminQueryClient, MEMBER_MOCK, MEMBERS_MOCK } from "./__testUtils";
import MembersMain from "../features/members/MembersMain";

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

describe("MembersMain", () => {
	test("renders correctly with admin user", async () => {
		renderWithQueryClientAndMemoryRouter(<MembersMain />, adminQueryClient);

		const loading = screen.getByText(/loading/i);
		expect(loading).toBeInTheDocument();

		const buttons = await screen.findAllByRole("button", { name: /delete/i });

		expect(buttons).toHaveLength(MEMBERS_MOCK.length);
	});

	test("renders correctly with nonadmin user", async () => {
		renderWithQueryClientAndMemoryRouter(<MembersMain />);

		await waitFor(() => {
			const button = screen.queryByRole("button", { name: /delete/i });
			expect(button).not.toBeInTheDocument();
		});
	});

	test("renders connection error message when one happens", async () => {
		renderWithQueryClientAndMemoryRouter(<MembersMain />);
		server.use(...errorHandlers);

		const networkError = await screen.findByText(/try again later/i);
		expect(networkError).toBeInTheDocument();
	});
});
