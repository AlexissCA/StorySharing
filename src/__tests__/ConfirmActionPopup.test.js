import { screen } from "@testing-library/react";
import { useDeleteStories } from "../features/main/useStories";
import { renderWithQueryClient } from "./__testUtils";
import ConfirmActionPopup from "../ui/ConfirmActionPopup";

describe("ConfirmActionPopup", () => {
	test("renders correctly", () => {
		renderWithQueryClient(
			<ConfirmActionPopup messageCode="delete all stories" hook={useDeleteStories} isOpen={true} closePopup={() => {}} />
		);

		const message = screen.getByText(/are you sure/gi);

		expect(message).toBeInTheDocument();
	});
});
