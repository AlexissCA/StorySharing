import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { renderWithQueryClient, handlers, errorHandlers } from "./__testUtils";
import InviteMemberPopup from "../features/members/invite-member/InviteMemberPopup";

const server = setupServer(...handlers);
const CLOSE_POPUP_FN_MOCK = jest.fn();
beforeEach(() => {
	CLOSE_POPUP_FN_MOCK.mockClear();
});
beforeAll(() => {
	server.listen();
});
afterEach(() => {
	server.resetHandlers();
});
afterAll(() => {
	server.close();
});

describe("InviteMemberPopup", () => {
	test("renders correctly", () => {
		renderWithQueryClient(<InviteMemberPopup isOpen={true} />);

		const heading = screen.getByRole("heading", /invite/i);
		const closeIcon = screen.getByTestId("close-icon");
		const emailField = screen.getByRole("textbox", { name: /email/i });
		const submitButton = screen.getByRole("button", { name: /invit/i });

		expect(heading).toBeInTheDocument();
		expect(closeIcon).toBeInTheDocument();
		expect(emailField).toBeInTheDocument();
		expect(submitButton).toBeInTheDocument();
	});

	test("has error-input class added to blank email field after trying to submit", async () => {
		renderWithQueryClient(<InviteMemberPopup isOpen={true} />);

		const emailField = screen.getByRole("textbox", { name: /email/i });
		const submitButton = screen.getByRole("button", { name: /invit/i });

		await userEvent.click(submitButton);

		expect(emailField).toHaveClass("error-input");
	});

	test("has error-input class added to wrong filled email field after trying to submit", async () => {
		renderWithQueryClient(<InviteMemberPopup isOpen={true} />);

		const emailField = screen.getByRole("textbox", { name: /email/i });
		const submitButton = screen.getByRole("button", { name: /invit/i });

		await userEvent.type(emailField, "test");

		await userEvent.click(submitButton);

		expect(emailField).toHaveClass("error-input");
	});

	test("renders connection error message when one happens on submit", async () => {
		renderWithQueryClient(<InviteMemberPopup isOpen={true} />);
		server.use(...errorHandlers);

		const emailField = screen.getByRole("textbox", { name: /email/i });
		const submitButton = screen.getByRole("button", { name: /invit/i });

		await userEvent.type(emailField, "test@test.com");

		await userEvent.click(submitButton);

		const networkError = await screen.findByText(/try again later/i);
		expect(networkError).toBeInTheDocument();
	});
});
