import { screen } from "@testing-library/react";
import { renderWithMemoryRouter } from "./__testUtils";
import MainContainer from "../ui/MainContainer";

test("MainContainer renders correctly", () => {
	renderWithMemoryRouter(
		<MainContainer>
			<div>Test Child</div>
		</MainContainer>
	);

	const childElement = screen.getByText("Test Child");
	expect(childElement).toBeInTheDocument();
});
