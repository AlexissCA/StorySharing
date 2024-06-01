import { render, screen } from "@testing-library/react";
import Spinner from "../ui/Spinner";

test("Spinner renders correctly", () => {
	render(<Spinner />);

	const heading = screen.getByRole("heading");
	expect(heading).toHaveTextContent(/loading/i);
});
