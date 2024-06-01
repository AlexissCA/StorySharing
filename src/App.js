import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Background from "./ui/Background";
import ResetScroll from "./ui/ResetScroll";
import SpinnerOverlay from "./ui/SpinnerOverlay";
import ProtectedRoutes from "./ui/ProtectedRoutes";

const LoginPromise = import("./pages/Login");
const RegisterPromise = import("./pages/Register");
const HomePromise = import("./pages/Home");
const StoryPromise = import("./pages/Story");
const MembersPromise = import("./pages/Members");
const ShareStoryPromise = import("./pages/ShareStory");
const ProfileSettingsPromise = import("./pages/ProfileSettings");
const NotFoundPromise = import("./pages/NotFound");

const Login = lazy(() => LoginPromise);
const Register = lazy(() => RegisterPromise);
const Home = lazy(() => HomePromise);
const Members = lazy(() => MembersPromise);
const ShareStory = lazy(() => ShareStoryPromise);
const ProfileSettings = lazy(() => ProfileSettingsPromise);
const Story = lazy(() => StoryPromise);
const NotFound = lazy(() => NotFoundPromise);

const queryClient = new QueryClient();

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
				<Background />
				<BrowserRouter>
					<Suspense fallback={<SpinnerOverlay />}>
						<ResetScroll />
						<Routes>
							<Route element={<ProtectedRoutes />}>
								<Route path="" element={<Home />} />
								<Route path="members" element={<Members />} />
								<Route path="share-story" element={<ShareStory />} />
								<Route path="profile-settings" element={<ProfileSettings />} />
								<Route path="story/:id" element={<Story />} />
							</Route>
							<Route path="login" element={<Login />} />
							<Route path="register" element={<Register />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</Suspense>
				</BrowserRouter>
		</QueryClientProvider>
	);
}
