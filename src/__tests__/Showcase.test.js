import { render, screen } from "@testing-library/react";
import Showcase from "../ui/Showcase";

describe("Showcase", () => {
	test("renders correctly", () => {
		render(<Showcase />);

		const heading = screen.getByRole("heading");
		expect(heading).toHaveTextContent(/story today/i);
	});
});
