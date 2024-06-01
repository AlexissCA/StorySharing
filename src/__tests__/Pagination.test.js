import { renderWithMemoryRouter } from "./__testUtils";
import Pagination from "../ui/Pagination";

test("Pagination renders without crashing", () => {
	renderWithMemoryRouter(<Pagination />);
});
