import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithQueryClientAndMemoryRouter, adminQueryClient } from "./__testUtils";
import SiteNav from "../ui/SiteNav";

describe("SiteNav", () => {
	test("does not render 'share story' link when user is an admin", () => {
		renderWithQueryClientAndMemoryRouter(<SiteNav />, adminQueryClient);

		const shareStoryLink = screen.queryByText(/share story/i);
		expect(shareStoryLink).not.toBeInTheDocument();
	});

	test("does render 'share story' link when user is not an admin", () => {
		renderWithQueryClientAndMemoryRouter(<SiteNav />);

		const shareStoryLink = screen.queryByText(/share story/i);
		expect(shareStoryLink).toBeInTheDocument();
	});

	test("focus elements in the right order", async () => {
		renderWithQueryClientAndMemoryRouter(<SiteNav />);

		const links = screen.getAllByRole("link");
		await userEvent.tab();
		expect(links[0]).toHaveFocus();
		await userEvent.tab();
		expect(links[1]).toHaveFocus();
		await userEvent.tab();
		expect(links[2]).toHaveFocus();
	});
});
