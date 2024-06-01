import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { renderWithQueryClientAndMemoryRouter, handlers, errorHandlers} from "./__testUtils";
import { TEXTAREA_MIN_HEIGHT } from "../utils/constants";
import { shortenFileName } from "../utils/stringHelpers";
import ShareStoryForm from "../features/share-story/ShareStoryForm";

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

describe("ShareStoryForm", () => {
	test("renders correctly", () => {
		renderWithQueryClientAndMemoryRouter(<ShareStoryForm />);

		const heading = screen.getByRole("heading", /share story/i);
		const titleField = screen.getByRole("textbox", { name: /title/i });
		const textField = screen.getByRole("textbox", { name: /story/i });
		const imgInput = screen.getByLabelText(/add image/i);
		const img = screen.queryByRole("img");
		const notifyCheckbox = screen.getByRole("checkbox", { name: /notify/i });
		const submitButton = screen.getByRole("button", { name: /share story/i });

		expect(heading).toBeInTheDocument();
		expect(titleField).toBeInTheDocument();
		expect(textField).toBeInTheDocument();
		expect(imgInput).toBeInTheDocument();
		expect(img).not.toBeInTheDocument();
		expect(notifyCheckbox).toBeInTheDocument();
		expect(submitButton).toBeInTheDocument();
	});

	test("toggles notify everybody checkbox", async () => {
		renderWithQueryClientAndMemoryRouter(<ShareStoryForm />);

		const notifyCheckbox = screen.getByRole("checkbox", { name: /notify/i });
		expect(notifyCheckbox).toBeChecked();

		await userEvent.click(notifyCheckbox);

		expect(notifyCheckbox).not.toBeChecked();
	});

	test("does not submit when title or story are empty", async () => {
		renderWithQueryClientAndMemoryRouter(<ShareStoryForm />);

		const titleField = screen.getByRole("textbox", { name: /title/i });
		const textField = screen.getByRole("textbox", { name: /story/i });
		const submitButton = screen.getByRole("button", { name: /share story/i });

		await userEvent.click(submitButton);

		expect(titleField).toHaveClass("error-input");
		expect(textField).toHaveClass("error-input");
	});

	test("submits when title and story are provided and shows error when there is one", async () => {
		renderWithQueryClientAndMemoryRouter(<ShareStoryForm />);
		server.use(...errorHandlers);

		const titleField = screen.getByRole("textbox", { name: /title/i });
		const textField = screen.getByRole("textbox", { name: /story/i });
		const submitButton = screen.getByRole("button", { name: /share story/i });

		await userEvent.type(titleField, "Test");
		await userEvent.type(textField, "test");

		await userEvent.click(submitButton);

		const networkError = await screen.findByText(/try again later/i);
		expect(networkError).toBeInTheDocument();
	});

	test("clears error on field focus", async () => {
		renderWithQueryClientAndMemoryRouter(<ShareStoryForm />);

		const titleField = screen.getByRole("textbox", { name: /title/i });
		const textField = screen.getByRole("textbox", { name: /story/i });
		const submitButton = screen.getByRole("button", { name: /share story/i });

		await userEvent.click(submitButton);
		expect(titleField).toHaveClass("error-input");
		expect(textField).toHaveClass("error-input");

		await userEvent.click(titleField);
		await userEvent.click(textField);
		expect(titleField).not.toHaveClass("error-input");
		expect(textField).not.toHaveClass("error-input");
	});

	test("handles image file adding and removing", async () => {
		global.URL.createObjectURL = jest.fn();
		const file = new File(["dummy content"], "superlong-test-filename.png", { type: "image/png" });
		renderWithQueryClientAndMemoryRouter(<ShareStoryForm />);

		const imgInput = screen.getByLabelText(/add image/i);

		await userEvent.upload(imgInput, file);

		const img = screen.getByRole("img");
		expect(img).toBeInTheDocument();
		const imgFileName = screen.getByText(shortenFileName(file.name));
		expect(imgFileName).toBeInTheDocument();
		const deleteImgIcon = screen.getByTestId("close-icon");

		await userEvent.click(deleteImgIcon);
		expect(img).not.toBeInTheDocument();
	});

	test("has story textarea with fixed height", () => {
		renderWithQueryClientAndMemoryRouter(<ShareStoryForm />);

		const textField = screen.getByRole("textbox", { name: /story/i });
		expect(textField).toHaveStyle({ height: TEXTAREA_MIN_HEIGHT + "px" });
	});
});
