import { render, screen } from "@testing-library/react";
import AuthLogo from "../features/authentication/AuthLogo";

test("AuthLogo renders correctly", () => {
	render(<AuthLogo />);

	const heading = screen.getByRole("heading");
	expect(heading).toHaveTextContent(/storysharing/i);
});
