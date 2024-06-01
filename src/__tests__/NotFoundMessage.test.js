import { render } from "@testing-library/react";
import ProblemMessage from "../ui/ProblemMessage";

test("ProblemMessage renders without crashing", () => {
	render(<ProblemMessage />);
});
