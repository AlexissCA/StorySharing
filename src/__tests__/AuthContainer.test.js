import { screen } from "@testing-library/react";
import { renderWithMemoryRouter } from "./__testUtils";
import AuthContainer from "../features/authentication/AuthContainer";

test("AuthContainer renders correctly", () => {
	renderWithMemoryRouter(
		<AuthContainer>
			<div>Test Child</div>
		</AuthContainer>
	);

	const childElement = screen.getByText("Test Child");
	expect(childElement).toBeInTheDocument();
});
