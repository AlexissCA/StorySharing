import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { renderWithQueryClientAndMemoryRouter, MEMBER_MOCK, handlers, errorHandlers } from "./__testUtils";
import ProfileSettingsForm from "../features/members/profile-settings/ProfileSettingsForm";

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

describe("ProfileSettingsForm", () => {
	test("renders correctly", () => {
		renderWithQueryClientAndMemoryRouter(<ProfileSettingsForm />);

		const heading = screen.getByRole("heading", { name: /profile settings/i });
		const imgInput = screen.getByLabelText(/picture/i);
		const colorInput = screen.getByLabelText(/color/i);
		const usernameField = screen.getByRole("textbox", { name: /username/i });
		const descriptionField = screen.getByRole("textbox", { name: /description/i });
		const currentPasswordField = screen.getByLabelText(/current/i);
		const passwordField = screen.getByLabelText(/^new password/i);
		const password2Field = screen.getByLabelText(/confirm new password/i);
		const notifyCheckbox = screen.getByRole("checkbox", { name: /notify/i });
		const submitButton = screen.getByRole("button", { name: /save/i });

		expect(heading).toBeInTheDocument();
		expect(imgInput).toBeInTheDocument();
		expect(colorInput).toBeInTheDocument();
		expect(usernameField).toBeInTheDocument();
		expect(descriptionField).toBeInTheDocument();
		expect(currentPasswordField).toBeInTheDocument();
		expect(passwordField).toBeInTheDocument();
		expect(password2Field).toBeInTheDocument();
		expect(notifyCheckbox).toBeInTheDocument();
		expect(submitButton).toBeInTheDocument();
	});

	test("toggles notify everybody checkbox", async () => {
		renderWithQueryClientAndMemoryRouter(<ProfileSettingsForm />);

		const notifyCheckbox = screen.getByRole("checkbox", { name: /notify/i });

		expect(notifyCheckbox).not.toBeChecked();
		await userEvent.click(notifyCheckbox);
		expect(notifyCheckbox).toBeChecked();
	});

	test("does not submit when data haven't change", async () => {
		renderWithQueryClientAndMemoryRouter(<ProfileSettingsForm />);

		const submitButton = screen.getByRole("button", { name: /save/i });

		await userEvent.click(submitButton);

		const loading = screen.queryByText(/loading/i);
		expect(loading).not.toBeInTheDocument();
	});

	test("does not submit when username is empty", async () => {
		renderWithQueryClientAndMemoryRouter(<ProfileSettingsForm />);

		const usernameField = screen.getByRole("textbox", { name: /username/i });
		const submitButton = screen.getByRole("button", { name: /save/i });

		await userEvent.clear(usernameField);

		await userEvent.click(submitButton);

		expect(usernameField).toHaveClass("error-input");
	});

	test("does not submit when username is less than 3 characters", async () => {
		renderWithQueryClientAndMemoryRouter(<ProfileSettingsForm />);

		const usernameField = screen.getByRole("textbox", { name: /username/i });
		const submitButton = screen.getByRole("button", { name: /save/i });

		await userEvent.clear(usernameField);
		await userEvent.type(usernameField, "te");

		await userEvent.click(submitButton);

		expect(usernameField).toHaveClass("error-input");
	});

	test("does not submit when password fields are incorrectly filled", async () => {
		renderWithQueryClientAndMemoryRouter(<ProfileSettingsForm />);

		const currentPasswordField = screen.getByLabelText(/current/i);
		const passwordField = screen.getByLabelText(/^new password/i);
		const password2Field = screen.getByLabelText(/confirm new password/i);
		const submitButton = screen.getByRole("button", { name: /save/i });

		await userEvent.type(currentPasswordField, "test");
		await userEvent.click(submitButton);
		expect(currentPasswordField).toHaveClass("error-input");
		expect(passwordField).toHaveClass("error-input");
		expect(password2Field).toHaveClass("error-input");

		await userEvent.clear(currentPasswordField);
		await userEvent.type(passwordField, "test");
		await userEvent.click(submitButton);
		expect(currentPasswordField).toHaveClass("error-input");
		expect(passwordField).toHaveClass("error-input");
		expect(password2Field).toHaveClass("error-input");

		await userEvent.clear(passwordField);
		await userEvent.type(passwordField, "t3$");
		await userEvent.clear(password2Field);
		await userEvent.type(password2Field, "t3$t");
		await userEvent.click(submitButton);
		expect(password2Field).toHaveClass("error-input");

		await userEvent.clear(passwordField);
		await userEvent.type(passwordField, "test");
		await userEvent.clear(password2Field);
		await userEvent.type(password2Field, "test");
		await userEvent.click(submitButton);
		expect(passwordField).toHaveClass("error-input");
		expect(password2Field).toHaveClass("error-input");
	});

	test("submits when data have changed", async () => {
		renderWithQueryClientAndMemoryRouter(<ProfileSettingsForm />);

		const usernameField = screen.getByRole("textbox", { name: /username/i });
		const submitButton = screen.getByRole("button", { name: /save/i });

		await userEvent.type(usernameField, "testUser");

		await userEvent.click(submitButton);

		const SuccessMessage = await screen.findByText(/updated/i);
		expect(SuccessMessage).toBeInTheDocument();
	});

	test("renders connection error message when one happens on submit", async () => {
		renderWithQueryClientAndMemoryRouter(<ProfileSettingsForm />);
		server.use(...errorHandlers);

		const usernameField = screen.getByRole("textbox", { name: /username/i });
		const submitButton = screen.getByRole("button", { name: /save/i });

		await userEvent.type(usernameField, "testUser");

		await userEvent.click(submitButton);

		const networkError = await screen.findByText(/try again later/i);
		expect(networkError).toBeInTheDocument();
	});

	test("changes user decription correctly", async () => {
		renderWithQueryClientAndMemoryRouter(<ProfileSettingsForm />);

		const descriptionField = screen.getByRole("textbox", { name: /description/i });

		await userEvent.type(descriptionField, "test description");
		expect(descriptionField).toHaveTextContent(MEMBER_MOCK.description + "test description");
	});

	test("updates image", async () => {
		const MOCK_URL = "blob:http://localhost:3000/blob";
		global.URL.createObjectURL = jest.fn().mockImplementation(() => MOCK_URL);
		const file = new File([], "test.jpg", { type: "image/png" });
		renderWithQueryClientAndMemoryRouter(<ProfileSettingsForm />);

		const imgInput = screen.getByLabelText(/picture/i);

		await userEvent.upload(imgInput, file);

		const img = screen.getByLabelText(/icon/i);
		expect(img).toHaveAttribute("src", MOCK_URL);
	});

	test("updates color", async () => {
		renderWithQueryClientAndMemoryRouter(<ProfileSettingsForm />);

		const colorInput = screen.getByLabelText(/color/i);
		expect(colorInput.value).toBe(MEMBER_MOCK.color);

		fireEvent.change(colorInput, { target: { value: "#333333" } });

		await waitFor(() => {
			expect(colorInput.value).toBe("#333333");
		});
	});
});
