import { render } from "@testing-library/react";
import SpinnerOverlay from "../ui/SpinnerOverlay";

test("SpinnerOverlay renders without crashing", () => {
	render(<SpinnerOverlay />);
});
