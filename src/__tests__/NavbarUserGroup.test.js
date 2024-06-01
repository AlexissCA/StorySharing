import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithQueryClientAndMemoryRouter, MEMBER_ADMIN_MOCK, adminQueryClient } from "./__testUtils";
import NavbarUserGroup from "../ui/NavbarUserGroup";

describe("NavbarUserGroup", () => {
	test("renders username and icon", () => {
		renderWithQueryClientAndMemoryRouter(<NavbarUserGroup />, adminQueryClient);

		const username = screen.getByText(MEMBER_ADMIN_MOCK.username);
		const avatar = screen.getByRole("img");

		expect(username).toBeInTheDocument();
		expect(avatar).toBeInTheDocument();
	});

	test("renders correctly with menu closed", () => {
		renderWithQueryClientAndMemoryRouter(<NavbarUserGroup />);

		const profileSettingsLink = screen.queryByRole("link", { name: /profile settings/i });
		expect(profileSettingsLink).not.toBeInTheDocument();
	});

	test("opens and closes menu correctly", async () => {
		renderWithQueryClientAndMemoryRouter(<NavbarUserGroup />);

		const profileSettingsLink = screen.queryByRole("link", { name: /profile settings/i });
		expect(profileSettingsLink).not.toBeInTheDocument();

		const userIcon = screen.getByLabelText(/member icon/i);

		await userEvent.click(userIcon);

		const profileSettingsLinkAfterOpen = screen.getByRole("link", { name: /profile settings/i });
		expect(profileSettingsLinkAfterOpen).toBeInTheDocument();

		await userEvent.click(userIcon);
		expect(profileSettingsLinkAfterOpen).not.toBeInTheDocument();
	});
});
