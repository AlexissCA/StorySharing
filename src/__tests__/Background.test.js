import { render } from "@testing-library/react";
import Background from "../ui/Background";

test("Background renders without crashing", () => {
	render(<Background />);
});
