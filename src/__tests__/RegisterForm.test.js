import { screen, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";
import { renderWithQueryClientAndMemoryRouter, handlers, errorHandlers, unauthorizedHandlers } from "./__testUtils";
import RegisterForm from "../features/authentication/RegisterForm";

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

describe("RegisterForm", () => {
	test("renders correctly", () => {
		renderWithQueryClientAndMemoryRouter(<RegisterForm />);

		const emailField = screen.getByRole("textbox", { name: /email/i });
		const usernameField = screen.getByRole("textbox", { name: /username/i });
		const passwordField = screen.getByLabelText(/^password/i);
		const password2Field = screen.getByLabelText(/confirm password/i);
		const submitButton = screen.getByRole("button");

		expect(emailField).toBeInTheDocument();
		expect(emailField).not.toHaveClass("error-input");
		expect(usernameField).toBeInTheDocument();
		expect(usernameField).not.toHaveClass("error-input");
		expect(passwordField).toBeInTheDocument();
		expect(passwordField).not.toHaveClass("error-input");
		expect(password2Field).toBeInTheDocument();
		expect(password2Field).not.toHaveClass("error-input");
		expect(submitButton).toBeInTheDocument();
	});

	test("has error-input class added to blank fields after trying to submit", async () => {
		renderWithQueryClientAndMemoryRouter(<RegisterForm />);

		const emailField = screen.getByRole("textbox", { name: /email/i });
		const usernameField = screen.getByRole("textbox", { name: /username/i });
		const passwordField = screen.getByLabelText(/^password/i);
		const password2Field = screen.getByLabelText(/confirm password/i);
		const submitButton = screen.getByRole("button");

		await userEvent.click(submitButton);
		expect(emailField).toHaveClass("error-input");
		expect(usernameField).toHaveClass("error-input");
		expect(passwordField).toHaveClass("error-input");
		expect(password2Field).toHaveClass("error-input");
	});

	test("has error-input class added to incorrectly filled fields after trying to submit", async () => {
		renderWithQueryClientAndMemoryRouter(<RegisterForm />);

		const emailField = screen.getByRole("textbox", { name: /email/i });
		const usernameField = screen.getByRole("textbox", { name: /username/i });
		const passwordField = screen.getByLabelText(/^password/i);
		const password2Field = screen.getByLabelText(/confirm password/i);
		const submitButton = screen.getByRole("button");

		await userEvent.type(emailField, "test.com");
		await userEvent.type(usernameField, "te");
		await userEvent.type(passwordField, "test");
		await userEvent.type(password2Field, "test");

		await userEvent.click(submitButton);

		expect(emailField).toHaveClass("error-input");
		expect(usernameField).toHaveClass("error-input");
		expect(passwordField).toHaveClass("error-input");
		expect(password2Field).toHaveClass("error-input");
	});

	test("has error-input class added when passwords do not match", async () => {
		renderWithQueryClientAndMemoryRouter(<RegisterForm />);

		const passwordField = screen.getByLabelText(/^password/i);
		const password2Field = screen.getByLabelText(/confirm password/i);
		const submitButton = screen.getByRole("button");

		await userEvent.type(passwordField, "test");
		await userEvent.type(password2Field, "test1");

		await userEvent.click(submitButton);

		expect(passwordField).toHaveClass("error-input");
	});

	test("clears errors on focus", async () => {
		renderWithQueryClientAndMemoryRouter(<RegisterForm />);

		const emailField = screen.getByRole("textbox", { name: /email/i });
		const usernameField = screen.getByRole("textbox", { name: /username/i });
		const passwordField = screen.getByLabelText(/^password/i);
		const password2Field = screen.getByLabelText(/confirm password/i);
		const submitButton = screen.getByRole("button");

		await userEvent.click(submitButton);

		expect(emailField).toHaveClass("error-input");
		expect(usernameField).toHaveClass("error-input");
		expect(passwordField).toHaveClass("error-input");
		expect(password2Field).toHaveClass("error-input");

		await userEvent.click(emailField);
		expect(emailField).not.toHaveClass("error-input");

		await userEvent.click(usernameField);
		expect(usernameField).not.toHaveClass("error-input");

		await userEvent.click(passwordField);
		expect(passwordField).not.toHaveClass("error-input");

		await userEvent.click(password2Field);
		expect(password2Field).not.toHaveClass("error-input");
	});

	test("submits when fields are correctly filled", async () => {
		renderWithQueryClientAndMemoryRouter(<RegisterForm setIsLoading={SET_IS_LOADING_FN_MOCK} />);

		const emailField = screen.getByRole("textbox", { name: /email/i });
		const usernameField = screen.getByRole("textbox", { name: /username/i });
		const passwordField = screen.getByLabelText(/^password/i);
		const password2Field = screen.getByLabelText(/confirm password/i);
		const submitButton = screen.getByRole("button");

		await userEvent.type(emailField, "test@test.com");
		await userEvent.type(usernameField, "test");
		await userEvent.type(passwordField, "test123&");
		await userEvent.type(password2Field, "test123&");

		await userEvent.click(submitButton);

		expect(SET_IS_LOADING_FN_MOCK).toHaveBeenCalledTimes(1);
	});

	test("shows error when unauthorized", async () => {
		renderWithQueryClientAndMemoryRouter(<RegisterForm setIsLoading={SET_IS_LOADING_FN_MOCK} />);
		server.use(...unauthorizedHandlers);

		const emailField = screen.getByRole("textbox", { name: /email/i });
		const usernameField = screen.getByRole("textbox", { name: /username/i });
		const passwordField = screen.getByLabelText(/^password/i);
		const password2Field = screen.getByLabelText(/confirm password/i);
		const submitButton = screen.getByRole("button");

		await userEvent.type(emailField, "test@test.com");
		await userEvent.type(usernameField, "test");
		await userEvent.type(passwordField, "test123&");
		await userEvent.type(password2Field, "test123&");

		await userEvent.click(submitButton);

		await waitFor(() => {
			expect(SET_IS_LOADING_FN_MOCK).toHaveBeenCalledTimes(2);
		});
	});

	test("renders Spinner when isLoading is true", () => {
		renderWithQueryClientAndMemoryRouter(<RegisterForm isLoading={true} />);

		const heading = screen.getByRole("heading");
		expect(heading).toHaveTextContent(/loading/i);
	});
});
