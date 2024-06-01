import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { renderWithQueryClientAndMemoryRouter, handlers, unauthorizedHandlers } from "./__testUtils";
import LoginForm from "../features/authentication/LoginForm";

const server = setupServer(...handlers);
const SET_IS_LOADING_FN_MOCK = jest.fn();
beforeEach(() => {
	SET_IS_LOADING_FN_MOCK.mockClear();
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

describe("LoginForm", () => {
	test("renders correctly", () => {
		renderWithQueryClientAndMemoryRouter(<LoginForm />);

		const emailField = screen.getByRole("textbox", { name: /email/i });
		const passwordField = screen.getByLabelText(/password/i);
		const submitButton = screen.getByRole("button");

		expect(emailField).toBeInTheDocument();
		expect(emailField).not.toHaveClass("error-input");
		expect(passwordField).toBeInTheDocument();
		expect(passwordField).not.toHaveClass("error-input");
		expect(submitButton).toBeInTheDocument();
	});

	test("has error-input class added to blank fields after trying to submit", async () => {
		renderWithQueryClientAndMemoryRouter(<LoginForm />);

		const emailField = screen.getByRole("textbox", { name: /email/i });
		const passwordField = screen.getByLabelText(/password/i);
		const submitButton = screen.getByRole("button");

		await userEvent.click(submitButton);

		expect(emailField).toHaveClass("error-input");
		expect(passwordField).toHaveClass("error-input");
	});

	test("has error-input class added to incorrectly filled fields after trying to submit", async () => {
		renderWithQueryClientAndMemoryRouter(<LoginForm />);

		const emailField = screen.getByRole("textbox", { name: /email/i });
		const passwordField = screen.getByLabelText(/password/i);
		const submitButton = screen.getByRole("button");

		await userEvent.type(emailField, "test.com");
		await userEvent.type(passwordField, "test");

		await userEvent.click(submitButton);

		expect(emailField).toHaveClass("error-input");
		expect(passwordField).toHaveClass("error-input");
	});

	test("clears errors on focus", async () => {
		renderWithQueryClientAndMemoryRouter(<LoginForm />);

		const emailField = screen.getByRole("textbox", { name: /email/i });
		const passwordField = screen.getByLabelText(/password/i);
		const submitButton = screen.getByRole("button");

		await userEvent.click(submitButton);

		expect(emailField).toHaveClass("error-input");
		expect(passwordField).toHaveClass("error-input");

		await userEvent.click(emailField);
		expect(emailField).not.toHaveClass("error-input");

		await userEvent.click(passwordField);
		expect(passwordField).not.toHaveClass("error-input");
	});

	test("submits when login and password are provided", async () => {
		renderWithQueryClientAndMemoryRouter(<LoginForm setIsLoading={SET_IS_LOADING_FN_MOCK} />);

		const emailField = screen.getByRole("textbox", { name: /email/i });
		const passwordField = screen.getByLabelText(/password/i);
		const submitButton = screen.getByRole("button");

		await userEvent.type(emailField, "test@test.com");
		await userEvent.type(passwordField, "test123&");

		await userEvent.click(submitButton);

		expect(SET_IS_LOADING_FN_MOCK).toHaveBeenCalledTimes(1);
	});

	test("shows error when unauthorized", async () => {
		renderWithQueryClientAndMemoryRouter(<LoginForm setIsLoading={SET_IS_LOADING_FN_MOCK} />);
		server.use(...unauthorizedHandlers);

		const emailField = screen.getByRole("textbox", { name: /email/i });
		const passwordField = screen.getByLabelText(/password/i);
		const submitButton = screen.getByRole("button");

		await userEvent.type(emailField, "test@test.com");
		await userEvent.type(passwordField, "test123&");

		await userEvent.click(submitButton);

		await waitFor(() => {
			expect(SET_IS_LOADING_FN_MOCK).toHaveBeenCalledTimes(2);
		});
	});

	test("renders Spinner when isLoading is true", () => {
		renderWithQueryClientAndMemoryRouter(<LoginForm isLoading={true} />);

		const heading = screen.getByRole("heading");
		expect(heading).toHaveTextContent(/loading/i);
	});
});
