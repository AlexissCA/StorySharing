import { render } from "@testing-library/react";
import NoResourcesMessage from "../ui/NoResourcesMessage";

test("NoResourcesMessage renders without crashing", () => {
	render(<NoResourcesMessage />);
});
