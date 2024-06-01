import { renderWithQueryClientAndMemoryRouter, adminQueryClient } from "./__testUtils";
import BasePageLayout from "../ui/BasePageLayout";

test("BasePageLayout renders without crash", () => {
	renderWithQueryClientAndMemoryRouter(<BasePageLayout />, adminQueryClient);
});
