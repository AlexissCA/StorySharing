import { render, screen } from "@testing-library/react";
import MemberAvatarDefault from "../ui/MemberAvatarDefault";

const COLOR = "#000";

describe("MemberAvatar", () => {
	test("renders correctly", () => {
		render(<MemberAvatarDefault color={COLOR} />);

		const svg = screen.getByLabelText("Member Icon");
		expect(svg).toBeInTheDocument();
		expect(svg).toHaveStyle({ fill: COLOR });
	});
});
