import { render } from "@testing-library/react";
import { rest } from "msw";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SUPABASE_URL } from "../services/supabase";

// MOCKS
export const STORY_ID = 7;

export const STORY_MOCK = {
	members: {
		username: "RainbowRider",
		img_url: "",
		color: "#ff00ff",
	},
	author_id: 2,
	created_at: "25.03.2024",
	id: STORY_ID,
	img_url: "../../data/tempIMG/guy-stevens-dEGu-oCuB1Y-unsplash.jpg",
	num_votes: 1,
	rating: 4,
	ratingDetails: [{ id: 1, created_at: "2024-08-20T20:58:44.168547+00:00", member_id: 2, story_id: 1, rating: 4 }],
	title: "Escapades of a Memory Magician",
	text: "Sint placeat debitis consequuntur, omnis in blanditiis ipsum, maxime autem veritatis iure harum cum sed architecto dolorum saepe illum, labore ipsa inventore perferendis id. Vel voluptates eligendi perferendis, perspiciatis cumque labore harum! Eos laudantium eum, libero pariatur vitae veniam ex ipsa autem optio error vel. Lorem ipsum dolor sit amet consectetur adipisicing elit...",
};

export const STORIES_MOCK = [
	{
		members: {
			username: "RainbowRider",
			img_url:
				"https://images.unsplash.com/photo-1634652200587-1e2bf8eb9d78?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			color: "#ff00ff",
		},
		id: 6,
		created_at: "25.03.2024",
		img_url: "",
		rating: 4,
		num_votes: 1,
		title: "Escapades of a Memory Magician",
		text: "Sint placeat debitis consequuntur, omnis in blanditiis ipsum, maxime autem veritatis iure harum cum sed architecto dolorum saepe illum, labore ipsa inventore perferendis id. Vel voluptates eligendi perferendis, perspiciatis cumque labore harum! Eos laudantium eum, libero pariatur vitae veniam ex ipsa autem optio error vel. Lorem ipsum dolor sit amet consectetur adipisicing elit...",
	},
	{
		id: 5,
		members: { username: "John Doe", img_url: "", color: "#67890d" },
		created_at: "16.03.2024",
		img_url: "",
		rating: 0,
		num_votes: 0,
		title: "Throwback Tales",
		text: "Omnis in blanditiis ipsum, maxime autem veritatis iure harum cum sed architecto dolorum saepe illum, labore ipsa inventore perferendis id. Vel voluptates eligendi perferendis, perspiciatis cumque labore harum!",
	},
	{
		id: 4,
		members: { username: "RainbowRider", img_url: "", color: "#f320ff" },
		created_at: "13.03.2024",
		img_url: "",
		rating: 2.55667,
		num_votes: 3,
		title: "Dreamy Doodle",
		text: "Eos laudantium eum, libero pariatur vitae veniam ex ipsa autem optio error vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint placeat debitis consequuntur, omnis in blanditiis ipsum, maxime autem veritatis iure harum cum sed architecto dolorum saepe illum, labore ipsa inventore perferendis id. Vel voluptates eligendi perferendis, perspiciatis cumque labore harum! Eos laudantium eum, libero pariatur vitae veniam ex ipsaaa autem optio error vel. Eos laudantium eum, libero pariatur vitae veniam ex ipsa autem optio error vel. Omnis in blanditiis ipsum, maxime autem veritatis iure harum cum sed architecto dolorum saepe illum, labore ipsa inventore perferendis id. Vel voluptates eligendi perferendis, perspiciatis cumque labore harum! Omnis in blanditiis ipsum, maxime autem veritatis iure harum cum sed architecto dolorum saepe illum, labore ipsa inventore perferendis id. Vel voluptates eligendi perferendis, perspiciatis cumque labore harum!",
	},
	{
		id: 3,
		members: { username: "John Doe", img_url: "", color: "#ff095f" },
		created_at: "13.03.2024",
		img_url: "",
		rating: 4.223333,
		num_votes: 3,
		title: "Title",
		text: "Sint placeat debitis consequuntur, omnis in blanditiis ipsum, maxime autem veritatis iure harum cum sed architecto dolorum saepe illum, labore ipsa inventore perferendis id. Vel voluptates eligendi perferendis, perspiciatis cumque labore harum! Eos laudantium eum, libero pariatur vitae veniam ex ipsa autem optio error...",
	},
	{
		id: 2,
		members: { username: "Name", img_url: "", color: "#2220ff" },
		created_at: "03.03.2024",
		img_url: "",
		rating: 2.75,
		num_votes: 4,
		title: "Smiles from the Past",
		text: "Eos laudantium eum, libero pariatur vitae veniam ex ipsa autem optio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint placeat debitis consequuntur, omnis in blanditiis ipsum, maxime autem veritatis iure harum cum sed architecto dolorum saepe illum, labore ipsa inventore perferendis id. Vel voluptates erferendis, perspiciatis cumque labore harum! Eos laudantium eum, libero pariatur vitae veniam ex ipsa autem optio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint placeat debitis consequuntur, omnis in blanditiis ipsum, maxime autem veritatis iure harum cum sed architecto dolorum saepe illum, labore ipsa inventore perferendis id. Vel voluptates erferendis, perspiciatis cumque labore harum! Eos laudantium eum, libero pariatur vitae veniam ex ipsa autem optio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint placeat debitis consequuntur, omnis in blanditiis ipsum, maxime autem veritatis iure harum cum sed architecto dolorum saepe illum, labore ipsa inventore perferendis id. Vel voluptates erferendis, perspiciatis cumque labore harum! Eos laudantium eum, libero pariatur vitae veniam ex ipsa autem optio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint placeat debitis consequuntur, omnis in blanditiis ipsum, maxime autem veritatis iure harum cum sed architecto dolorum saepe illum, labore ipsa inventore perferendis id. Vel voluptates erferendis, perspiciatis cumque labore harum!",
	},
	{
		id: 1,
		members: { username: "RainbowRider", img_url: "", color: "#12349f" },
		created_at: "01.03.2024",
		img_url: "",
		rating: 5,
		num_votes: 5,
		title: "Sweetest Perfection",
		text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint placeat debitis consequuntur, omnis in blanditiis ipsum, maxime autem veritatis iure harum cum sed architecto dolorum saepe illum, labore ipsa inventore perferendis id. Vel voluptates eligendi perferendis, perspiciatis cumque labore harum! Eos laudantium eum, libero pariatur vitae veniam ex ipsa autem optio error vel...",
	},
];

export const USER_MOCK = {
	id: "e33efdc3-d3ff-47e5-b43a-f2791ef620a5",
};

export const MEMBER_ADMIN_MOCK = {
	id: 0,
	username: "Name",
	description:
		"Totam perferendis iusto at cupiditate, sit cum mollitia? Exercitationem fugiat ipsam magni tempora nemo quasi est necessitatibus aspernatur quis eos nostrum maxime excepturi aperiam possimus tempore amet inventore facilis repellendus iste, omnis quos? Numquam iste eum consequuntur dolorum fugiat, ex rem. Suscipit ab corporis enim mollitia repellendus tempore, laboriosam voluptas, ipsum vero voluptates iure minima. Id blanditiis quidem itaque magni dolores necessitatibus nesciunt neque corrupti aspernatur. Totam perferendis iusto at cupiditate, sit cum mollitia? Exercitationem fugiat ipsam magni tempora nemo quasi est necessitatibus aspernatur quis eos nostrum maxime excepturi aperiam possimus tempore amet inventore facilis repellendus iste, omnis quos? Numquam iste eum consequuntur dolorum fugiat, ex rem. Suscipit ab corporis enim mollitia repellendus tempore, laboriosam voluptas, ipsum vero voluptates iure minima. Id blanditiis quidem itaque magni dolores necessitatibus nesciunt neque corrupti aspernatur. Totam perferendis iusto at cupiditate, sit cum mollitia? Exercitationem fugiat ipsam magni tempora nemo quasi est necessitatibus aspernatur quis eos nostrum maxime excepturi aperiam possimus tempore amet inventore facilis repellendus iste, omnis quos? Numquam iste eum consequuntur dolorum fugiat, ex rem. Suscipit ab corporis enim mollitia repellendus tempore, laboriosam voluptas, ipsum vero voluptates iure minima. Id blanditiis quidem itaque magni dolores necessitatibus nesciunt neque corrupti aspernatur.",
	img_url: "avatar.jpg",
	color: "#62c59f",
	notify: false,
	is_admin: true,
};
export const MEMBER_MOCK = {
	id: 1,
	username: "John Doe",
	description:
		"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui soluta dolores deleniti earum a id provident odit maxime quia! Totam perferendis iusto at cupiditate, sit cum mollitia? Exercitationem fugiat ipsam magni tempora nemo quasi est necessitatibus aspernatur quis eos nostrum maxime excepturi aperiam possimus tempore amet inventore facilis repellendus iste, omnis quos? Numquam iste eum consequuntur dolorum fugiat, ex rem. Suscipit ab corporis enim mollitia repellendus tempore, laboriosam voluptas, ipsum vero voluptates iure minima. Id blanditiis quidem itaque magni dolores necessitatibus nesciunt neque corrupti aspernatur. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui soluta dolores deleniti earum a id provident odit maxime quia! Totam perferendis iusto at cupiditate, sit cum mollitia? Exercitationem fugiat ipsam magni tempora nemo quasi est necessitatibus aspernatur quis eos nostrum maxime excepturi aperiam possimus tempore amet inventore facilis repellendus iste, omnis quos? Numquam iste eum consequuntur dolorum fugiat, ex rem. Suscipit ab corporis enim mollitia repellendus tempore, laboriosam voluptas, ipsum vero voluptates iure minima. Id blanditiis quidem itaque magni dolores necessitatibus nesciunt neque corrupti aspernatur.",
	img_url: "",
	color: "#ff784f",
	notify: false,
	is_admin: false,
	uid: "e33efdc3-d3ff-47e5-b43a-f2791ef620a5",
};

export const MEMBERS_MOCK = [
	{
		username: "Admin",
		description: "",
		img_url: "",
		color: "#ff784f",
		is_admin: true,
	},
	{
		username: "John Doe",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui soluta dolores deleniti earum a id provident odit maxime quia! Totam perferendis iusto at cupiditate, sit cum mollitia? Exercitationem fugiat ipsam magni tempora nemo quasi est necessitatibus aspernatur quis eos nostrum maxime excepturi aperiam possimus tempore amet inventore facilis repellendus iste, omnis quos? Numquam iste eum consequuntur dolorum fugiat, ex rem. Suscipit ab corporis enim mollitia repellendus tempore, laboriosam voluptas, ipsum vero voluptates iure minima. Id blanditiis quidem itaque magni dolores necessitatibus nesciunt neque corrupti aspernatur.",
		img_url: "",
		color: "#ff784f",
		is_admin: false,
	},
	{
		username: "Name",
		description:
			"Totam perferendis iusto at cupiditate, sit cum mollitia? Exercitationem fugiat ipsam magni tempora nemo quasi est necessitatibus aspernatur quis eos nostrum maxime excepturi aperiam possimus tempore amet inventore facilis repellendus iste, omnis quos? Numquam iste eum consequuntur dolorum fugiat, ex rem. Suscipit ab corporis enim mollitia repellendus tempore, laboriosam voluptas, ipsum vero voluptates iure minima. Id blanditiis quidem itaque magni dolores necessitatibus nesciunt neque corrupti aspernatur.",
		img_url: "",
		color: "#62c59f",
		is_admin: false,
	},
];

// URLS
const ROOT_URL = SUPABASE_URL + "/rest/v1";
export const URLS = {
	session: SUPABASE_URL + "/auth/v1/session",
	login: SUPABASE_URL + "/auth/v1/token",
	register: SUPABASE_URL + "/auth/v1/signup",
	user: SUPABASE_URL + "/auth/v1/user",
	members: ROOT_URL + "/members",
	stories: ROOT_URL + "/stories",
	ratings: ROOT_URL + "/ratings",
	invite: ROOT_URL + "/invited_members_emails",
};

// MSW HANDLERS
export const handlers = [
	rest.get(URLS.session, (request, response, context) => {
		return response(context.status(200));
	}),
	rest.post(URLS.login, (request, response, context) => {
		return response(context.delay(200));
	}),
	rest.post(URLS.register, (request, response, context) => {
		return response(context.delay(200), context.status(200));
	}),
	rest.get(URLS.user, (request, response, context) => {
		return response(context.delay(200));
	}),
	rest.get(URLS.members, (request, response, context) => {
		const uid = request.url.searchParams.get("uid");
		if (uid) {
			return response(context.delay(200), context.json(MEMBER_MOCK));
		}
		return response(context.delay(200), context.json(MEMBERS_MOCK));
	}),
	rest.post(URLS.members, (request, response, context) => {
		return response(context.delay(200), context.status(201));
	}),
	rest.patch(URLS.members, (request, response, context) => {
		return response(context.delay(200), context.status(201));
	}),
	rest.get(URLS.stories, (request, response, context) => {
		const id = request.url.searchParams.get("id");
		if (id) {
			return response(context.delay(200), context.json(STORY_MOCK));
		}
		return response(context.delay(200), context.json(STORIES_MOCK));
	}),
	rest.post(URLS.stories, (request, response, context) => {
		return response(context.delay(200), context.status(201));
	}),
	rest.post(URLS.ratings, (request, response, context) => {
		return response(context.delay(200), context.status(201));
	}),
	rest.post(URLS.invite, (request, response, context) => {
		return response(context.delay(200), context.status(201));
	}),
];

export const errorHandlers = [
	rest.get(URLS.stories, (request, response, context) => {
		return response(context.delay(200), context.status(500));
	}),
	rest.post(URLS.stories, (request, response, context) => {
		return response(context.delay(200), context.status(500));
	}),
	rest.get(URLS.members, (request, response, context) => {
		return response(context.delay(200), context.status(500));
	}),
	rest.post(URLS.members, (request, response, context) => {
		return response(context.delay(200), context.status(500));
	}),
	rest.patch(URLS.members, (request, response, context) => {
		return response(context.delay(200), context.status(500));
	}),
	rest.post(URLS.login, (request, response, context) => {
		return response(context.delay(200), context.status(400), context.json({ error: { code: "connection Error" } }));
	}),
	rest.post(URLS.register, (request, response, context) => {
		return response(context.delay(200), context.status(500));
	}),
	rest.post(URLS.invite, (request, response, context) => {
		return response(context.delay(200), context.status(500));
	}),
];

export const unauthorizedHandlers = [
	rest.post(URLS.login, (request, response, context) => {
		return response(context.delay(200), context.status(401));
	}),
	rest.post(URLS.register, (request, response, context) => {
		return response(context.delay(200), context.status(401));
	}),
];

export const conflictHandlers = [
	rest.post(URLS.register, (request, response, context) => {
		return response(context.delay(200), context.status(409));
	}),
];

export const notFoundHandlers = [
	rest.get(URLS.stories, (request, response, context) => {
		return response(context.delay(200), context.status(406));
	}),
];

export const noResourceHandlers = [
	rest.get(URLS.stories, (request, response, context) => {
		return response(context.delay(200), context.json([]));
	}),
];

// TEST QUERY CLIENT SETUP
function createTestQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				retryDelay: 1,
				retry: 0,
				staleTime: Infinity,
			},
		},
	});
}

export let queryClient;
export let authorQueryClient;
export let adminQueryClient;
beforeEach(() => {
	queryClient = createTestQueryClient();
	authorQueryClient = createTestQueryClient();
	adminQueryClient = createTestQueryClient();

	queryClient.setQueryData(["user"], { ...USER_MOCK, ...MEMBER_MOCK });
	authorQueryClient.setQueryData(["user"], { ...USER_MOCK, ...MEMBER_MOCK, id: 2 });
	adminQueryClient.setQueryData(["user"], { ...USER_MOCK, ...MEMBER_ADMIN_MOCK });
});

// RENDERING WRAPPER FUNCTIONS
export function renderWithQueryClient(component, queryClientP = queryClient) {
	return render(<QueryClientProvider client={queryClientP}>{component}</QueryClientProvider>);
}

export function renderWithMemoryRouter(component) {
	return render(<MemoryRouter>{component}</MemoryRouter>);
}

export function renderWithQueryClientAndMemoryRouter(component, queryClientP = queryClient) {
	return renderWithQueryClient(<MemoryRouter>{component}</MemoryRouter>, queryClientP);
}
