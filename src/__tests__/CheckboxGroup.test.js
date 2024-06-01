import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckboxGroup from "../ui/CheckboxGroup";

const ID = "test-checkbox";
const LABEL = "Test Checkbox";
const ON_CHANGE_FN_MOCK = jest.fn();
const CHECKED = true;
beforeEach(() => {
	ON_CHANGE_FN_MOCK.mockClear();
});

describe("CheckboxGroup", () => {
	test("renders correctly", () => {
		render(<CheckboxGroup id={ID} label={LABEL} checked={CHECKED} toggleNotify={ON_CHANGE_FN_MOCK} />);

		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).toBeInTheDocument();
		expect(checkbox).toHaveAttribute("id", ID);
		expect(checkbox).toHaveAttribute("name", ID);
		expect(checkbox).toBeChecked();

		const label = screen.getByText(LABEL);
		expect(label).toBeInTheDocument();
		expect(label).toHaveAttribute("for", ID);
	});

	test("calls toggleNotify when checkbox is clicked", async () => {
		render(<CheckboxGroup id={ID} label={LABEL} checked={CHECKED} toggleNotify={ON_CHANGE_FN_MOCK} />);

		const checkbox = screen.getByRole("checkbox");

		await userEvent.click(checkbox);

		expect(ON_CHANGE_FN_MOCK).toHaveBeenCalledTimes(1);
	});
});
