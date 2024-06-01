import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithQueryClientAndMemoryRouter } from "./__testUtils";
import UserMenu from "../ui/UserMenu";

const CLOSE_POPUP_FN_MOCK = jest.fn();
const OPEN_INVITE_MEMBER_POPUP_FN_MOCK = jest.fn();

beforeEach(() => {
	CLOSE_POPUP_FN_MOCK.mockClear();
	OPEN_INVITE_MEMBER_POPUP_FN_MOCK.mockClear();
});

describe("UserMenu", () => {
	test("renders correctly", () => {
		renderWithQueryClientAndMemoryRouter(<UserMenu />);

		const invite = screen.getByText(/invite member/i);
		const profileSettings = screen.getByRole("link", { name: /profile settings/i });
		const signout = screen.getByText(/sign out/i);

		expect(invite).toBeInTheDocument();
		expect(profileSettings).toBeInTheDocument();
		expect(signout).toBeInTheDocument();
	});

	test("closes menu popopup and opens invite friend popup after clicking invite", async () => {
		renderWithQueryClientAndMemoryRouter(
			<UserMenu closePopup={CLOSE_POPUP_FN_MOCK} openInviteMemberPopup={OPEN_INVITE_MEMBER_POPUP_FN_MOCK} />
		);

		const invite = screen.getByText(/invite member/i);

		await userEvent.click(invite);

		expect(CLOSE_POPUP_FN_MOCK).toHaveBeenCalled();
		expect(OPEN_INVITE_MEMBER_POPUP_FN_MOCK).toHaveBeenCalled();
	});

	test("closes menu and opens profile settings on click", async () => {
		renderWithQueryClientAndMemoryRouter(
			<UserMenu closePopup={CLOSE_POPUP_FN_MOCK} openInviteMemberPopup={OPEN_INVITE_MEMBER_POPUP_FN_MOCK} />
		);

		const profileSettingsLink = screen.getByText(/profile settings/i);

		await userEvent.click(profileSettingsLink);

		expect(CLOSE_POPUP_FN_MOCK).not.toHaveBeenCalled();
		expect(OPEN_INVITE_MEMBER_POPUP_FN_MOCK).not.toHaveBeenCalled();
	});
});
