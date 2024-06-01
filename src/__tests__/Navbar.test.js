import { screen } from "@testing-library/react";
import Navbar from "../ui/Navbar";
import { renderWithQueryClientAndMemoryRouter, MEMBER_ADMIN_MOCK, adminQueryClient } from "./__testUtils";

describe("Navbar", () => {
	test("renders correctly", () => {
		renderWithQueryClientAndMemoryRouter(<Navbar />, adminQueryClient);

		const logo = screen.getByText(/storysharing/i);
		const username = screen.getByText(MEMBER_ADMIN_MOCK.username);
		const sitenav = screen.getByRole("navigation");

		expect(logo).toBeInTheDocument();
		expect(username).toBeInTheDocument();
		expect(sitenav).toBeInTheDocument();
	});
});
