import { renderWithMemoryRouter } from "./__testUtils";
import ResetScroll from "../ui/ResetScroll";

test("ResetScroll renders without crashing", () => {
	renderWithMemoryRouter(<ResetScroll />);
});
