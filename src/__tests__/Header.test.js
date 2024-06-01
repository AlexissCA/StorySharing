import { renderWithQueryClientAndMemoryRouter, adminQueryClient } from "./__testUtils";
import Header from "../ui/Header";

test("Header renders without crash", () => {
	renderWithQueryClientAndMemoryRouter(<Header />, adminQueryClient);
});
