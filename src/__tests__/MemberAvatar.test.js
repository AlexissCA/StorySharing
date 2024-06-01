import { render, screen } from "@testing-library/react";
import MemberAvatar from "../ui/MemberAvatar";

describe("MemberAvatar", () => {
	test("renders image when image is passed", () => {
		render(<MemberAvatar id="" img="test.jpg" color="#000" />);

		const img = screen.getByRole("img");
		expect(img).toBeInTheDocument();
	});

	test("renders default svg icon when image is not passed", () => {
		render(<MemberAvatar id="" color="#000" />);

		const img = screen.queryByRole("img");
		expect(img).not.toBeInTheDocument();
		const svg = screen.getByLabelText("Member Icon");
		expect(svg).toBeInTheDocument();
	});
});
