import { renderWithQueryClientAndMemoryRouter } from "./__testUtils";
import ProtectedRoutes from "../ui/ProtectedRoutes";

test("ProtectedRoutes renders without crashing", () => {
	renderWithQueryClientAndMemoryRouter(<ProtectedRoutes />);
});
