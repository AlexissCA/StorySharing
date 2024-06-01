import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RatingDisplay from "../ui/RatingDisplay";

const HANDLE_HOVER_FN_MOCK = jest.fn();
const HANDLE_CLICK_FN_MOCK = jest.fn();
const HANDLE_LEAVE_FN_MOCK = jest.fn();
beforeEach(() => {
	HANDLE_HOVER_FN_MOCK.mockClear();
	HANDLE_CLICK_FN_MOCK.mockClear();
	HANDLE_LEAVE_FN_MOCK.mockClear();
});

describe("RatingDisplay", () => {
	test("renders correctly", () => {
		render(<RatingDisplay />);

		const icons = screen.getAllByTestId("heart-icon");
		expect(icons).toHaveLength(5);
	});

	test("calls handleHover on hover", async () => {
		render(<RatingDisplay handleHover={HANDLE_HOVER_FN_MOCK} />);

		const icons = screen.getAllByTestId("heart-icon");

		fireEvent.mouseMove(icons[0], { clientX: 10 });

		await waitFor(() => {
			expect(HANDLE_HOVER_FN_MOCK).toHaveBeenCalled();
		});
	});

	test("calls handleLeave on mouse leave", async () => {
		render(<RatingDisplay handleLeave={HANDLE_LEAVE_FN_MOCK} />);

		const icons = screen.getAllByTestId("heart-icon");

		fireEvent.mouseLeave(icons[0]);

		await waitFor(() => {
			expect(HANDLE_LEAVE_FN_MOCK).toHaveBeenCalled();
		});
	});

	test("calls handleClick on click", async () => {
		render(<RatingDisplay handleClick={HANDLE_CLICK_FN_MOCK} />);

		const icons = screen.getAllByTestId("heart-icon");

		await userEvent.click(icons[0]);

		expect(HANDLE_CLICK_FN_MOCK).toHaveBeenCalled();
	});
});
