import { adminQueryClient, renderWithQueryClient } from "./__testUtils";
import DeleteAllStories from "../features/main/DeleteAllStories";

test("DeleteAllStories renders without crash", () => {
	renderWithQueryClient(<DeleteAllStories />, adminQueryClient);
});
