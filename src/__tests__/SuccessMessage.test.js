import { render } from "@testing-library/react";
import SuccessMessage from "../ui/SuccessMessage";

test("SuccessMessage renders without crashing", () => {
	render(<SuccessMessage />);
});
