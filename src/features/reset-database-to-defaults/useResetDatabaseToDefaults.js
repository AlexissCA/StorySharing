import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMembers, addMembers, updateMember } from "../../services/apiMembers";
import { SUPABASE_URL } from "../../services/supabase";
import { useUser } from "../authentication/useUser";
import { addStories } from "../../services/apiStories";
import { addRatings } from "../../services/apiRatings";
import { createImageFileFromUrl } from "../../utils/imageFilesHelpers";
import { deleteInvitations } from "../../services/apiInviteMember";
import { login } from "../../services/apiUsers";

const ROOT_IMG_URL = SUPABASE_URL + "/storage/v1/object/public/";

const adminMemberCredentials = {
	email: "admin@storysharing.com",
	password: "admin123#",
};
const adminMemberProfileData = {
	id: "1",
	username: "Admin",
	img_url: "",
	color: "#dc002f",
	description: "",
	notify: "false",
};
const defaultMembers = [
	[
		{
			id: "2",
			created_at: "2024-08-20 18:21:01.377404+00",
			username: "Jane Doe",
			email: "janedoe@storysharing.com",
			img_url: ROOT_IMG_URL + "members/gabriel-silverio-u3WmDyKGsrY-unsplash.jpg",
			color: "#00627a",
			is_admin: "false",
			description:
				"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui soluta dolores deleniti earum a id provident odit maxime quia! Totam perferendis iusto at cupiditate, sit cum mollitia? Exercitationem fugiat ipsam magni tempora nemo quasi est necessitatibus aspernatur quis eos nostrum maxime excepturi aperiam possimus tempore amet inventore facilis repellendus iste, omnis quos? Numquam iste eum consequuntur dolorum fugiat, ex rem. Suscipit ab corporis enim mollitia repellendus tempore, laboriosam voluptas, ipsum vero voluptates iure minima. Id blanditiis quidem itaque magni dolores necessitatibus nesciunt neque corrupti aspernatur.",
			notify: "false",
		},
		{
			email: "janedoe@storysharing.com",
			password: "janeDoe123#",
		},
	],
	[
		{
			id: "3",
			created_at: "2024-08-20 18:25:23.755293+00",
			username: "Name",
			email: "undefined@storysharing.com",
			img_url: "",
			color: "",
			is_admin: "false",
			description:
				"Totam perferendis iusto at cupiditate, sit cum mollitia? Exercitationem fugiat ipsam magni tempora nemo quasi est necessitatibus aspernatur quis eos nostrum maxime excepturi aperiam possimus tempore amet inventore facilis repellendus iste, omnis quos? Numquam iste eum consequuntur dolorum fugiat, ex rem. Suscipit ab corporis enim mollitia repellendus tempore, laboriosam voluptas, ipsum vero voluptates iure minima. Id blanditiis quidem itaque magni dolores necessitatibus nesciunt neque corrupti aspernatur.",
			notify: "false",
		},
		{
			email: "undefined@storysharing.com",
			password: "undefined123#",
		},
	],
	[
		{
			id: "4",
			created_at: "2024-08-20 18:27:09.952904+00",
			username: "RainbowRider",
			email: "rainbowrider@storysharing.com",
			img_url: ROOT_IMG_URL + "members/kieran-white-NKN25UfGfkQ-unsplash.jpg",
			color: "#7816b6",
			is_admin: "false",
			description:
				"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui soluta dolores deleniti earum a id provident odit maxime quia! Totam perferendis iusto at cupiditate, sit cum mollitia? Exercitationem fugiat ipsam magni tempora nemo quasi est necessitatibus aspernatur quis eos nostrum maxime excepturi aperiam possimus tempore amet inventore facilis repellendus iste, omnis quos? Numquam iste eum consequuntur dolorum fugiat, ex rem. Suscipit ab corporis enim mollitia repellendus tempore, laboriosam voluptas, ipsum vero voluptates iure minima. Id blanditiis quidem itaque magni dolores necessitatibus nesciunt neque corrupti aspernatur. Suscipit ab corporis enim mollitia repellendus tempore, laboriosam voluptas, ipsum vero voluptates iure minima. Id blanditiis quidem itaque magni dolores necessitatibus nesciunt neque corrupti aspernatur.",
			notify: "false",
		},
		{
			email: "rainbowrider@storysharing.com",
			password: "rainbowRider123#",
		},
	],
];

const defaultStories = [
	{
		id: "1",
		created_at: "2024-08-20 20:57:13.800171+00",
		author_id: "4",
		img_url: ROOT_IMG_URL + "stories/clarke-sanders-nM4gJR-7RWQ-unsplash.jpg",
		rating: "4",
		num_votes: "1",
		title: "Sweetest Perfection",
		text: "Sint placeat debitis consequuntur, omnis in blanditiis ipsum, maxime autem veritatis iure harum cum sed architecto dolorum saepe illum, labore ipsa inventore perferendis id. Vel voluptates eligendi perferendis, perspiciatis cumque labore harum! Eos laudantium eum, libero pariatur vitae veniam ex ipsa autem optio error vel. Lorem ipsum dolor sit amet consectetur adipisicing elit...",
	},
	{
		id: "2",
		created_at: "2024-08-20 21:03:53.750044+00",
		author_id: "2",
		img_url: ROOT_IMG_URL + "stories/benigno-hoyuela-72zsd_fnxYc-unsplash.jpg",
		rating: "0",
		num_votes: "0",
		title: "Throwback Tales",
		text: "Omnis in blanditiis ipsum, maxime autem veritatis iure harum cum sed architecto dolorum saepe illum, labore ipsa inventore perferendis id. Vel voluptates eligendi perferendis, perspiciatis cumque labore harum!",
	},
	{
		id: "3",
		created_at: "2024-08-20 21:12:36.915235+00",
		author_id: "4",
		img_url: ROOT_IMG_URL + "stories/bruce-christianson-86AN3JFiBsY-unsplash.jpg",
		rating: "3.835",
		num_votes: "2",
		title: "Dreamy Doodle",
		text: "Eos laudantium eum, libero pariatur vitae veniam ex ipsa autem optio error vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint placeat debitis consequuntur, omnis in blanditiis ipsum, maxime autem veritatis iure harum cum sed architecto dolorum saepe illum, labore ipsa inventore perferendis id. Vel voluptates eligendi perferendis, perspiciatis cumque labore harum! Eos laudantium eum, libero pariatur vitae veniam ex ipsaaa autem optio error vel. Eos laudantium eum, libero pariatur vitae veniam ex ipsa autem optio error vel. Omnis in blanditiis ipsum, maxime autem veritatis iure harum cum sed architecto dolorum saepe illum, labore ipsa inventore perferendis id. Vel voluptates eligendi perferendis, perspiciatis cumque labore harum! Omnis in blanditiis ipsum, maxime autem veritatis iure harum cum sed architecto dolorum saepe illum, labore ipsa inventore perferendis id. Vel voluptates eligendi perferendis, perspiciatis cumque labore harum!",
	},
	{
		id: "4",
		created_at: "2024-08-20 21:19:23.292016+00",
		author_id: "2",
		img_url: ROOT_IMG_URL + "stories/sam-mar-OQOKSsj8QME-unsplash.jpg",
		rating: "4.5",
		num_votes: "2",
		title: "Title",
		text: "Sint placeat debitis consequuntur, omnis in blanditiis ipsum, maxime autem veritatis iure harum cum sed architecto dolorum saepe illum, labore ipsa inventore perferendis id. Vel voluptates eligendi perferendis, perspiciatis cumque labore harum! Eos laudantium eum, libero pariatur vitae veniam ex ipsa autem optio error...",
	},
	{
		id: "5",
		created_at: "2024-08-20 21:28:41.805387+00",
		author_id: "3",
		img_url: ROOT_IMG_URL + "stories/antonino-visalli-RNiBLy7aHck-unsplash.jpg",
		rating: "4.5",
		num_votes: "2",
		title: "Smiles from the Past",
		text: "Eos laudantium eum, libero pariatur vitae veniam ex ipsa autem optio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint placeat debitis consequuntur, omnis in blanditiis ipsum, maxime autem veritatis iure harum cum sed architecto dolorum saepe illum, labore ipsa inventore perferendis id. Vel voluptates erferendis, perspiciatis cumque labore harum! Eos laudantium eum, libero pariatur vitae veniam ex ipsa autem optio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint placeat debitis consequuntur, omnis in blanditiis ipsum, maxime autem veritatis iure harum cum sed architecto dolorum saepe illum, labore ipsa inventore perferendis id. Vel voluptates erferendis, perspiciatis cumque labore harum! Eos laudantium eum, libero pariatur vitae veniam ex ipsa autem optio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint placeat debitis consequuntur, omnis in blanditiis ipsum, maxime autem veritatis iure harum cum sed architecto dolorum saepe illum, labore ipsa inventore perferendis id. Vel voluptates erferendis, perspiciatis cumque labore harum! Eos laudantium eum, libero pariatur vitae veniam ex ipsa autem optio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint placeat debitis consequuntur, omnis in blanditiis ipsum, maxime autem veritatis iure harum cum sed architecto dolorum saepe illum, labore ipsa inventore perferendis id. Vel voluptates erferendis, perspiciatis cumque labore harum!",
	},
	{
		id: "6",
		created_at: "2024-08-20 21:32:11.988443+00",
		author_id: "4",
		img_url: ROOT_IMG_URL + "stories/guy-stevens-dEGu-oCuB1Y-unsplash.jpg",
		rating: "5",
		num_votes: "2",
		title: "Escapades of a Memory Magician",
		text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint placeat debitis consequuntur, omnis in blanditiis ipsum, maxime autem veritatis iure harum cum sed architecto dolorum saepe illum, labore ipsa inventore perferendis id. Vel voluptates eligendi perferendis, perspiciatis cumque labore harum! Eos laudantium eum, libero pariatur vitae veniam ex ipsa autem optio error vel...",
	},
];

const defaultRatings = [
	{
		id: "1",
		created_at: "2024-08-20 20:58:44.168547+00",
		member_id: "2",
		story_id: "1",
		rating: "4",
	},
	{
		id: "2",
		created_at: "2024-08-20 21:14:16.668353+00",
		member_id: "2",
		story_id: "3",
		rating: "3.67",
	},
	{
		id: "3",
		created_at: "2024-08-20 21:15:06.738459+00",
		member_id: "3",
		story_id: "3",
		rating: "4",
	},
	{
		id: "4",
		created_at: "2024-08-20 21:21:38.756484+00",
		member_id: "3",
		story_id: "4",
		rating: "4.67",
	},
	{
		id: "5",
		created_at: "2024-08-20 21:22:04.502058+00",
		member_id: "4",
		story_id: "4",
		rating: "5",
	},
	{
		id: "6",
		created_at: "2024-08-20 21:29:49.255886+00",
		member_id: "2",
		story_id: "5",
		rating: "5",
	},
	{
		id: "7",
		created_at: "2024-08-20 21:30:11.418499+00",
		member_id: "4",
		story_id: "5",
		rating: "4",
	},
	{
		id: "8",
		created_at: "2024-08-20 21:32:49.862377+00",
		member_id: "2",
		story_id: "6",
		rating: "5",
	},
	{
		id: "9",
		created_at: "2024-08-20 21:33:36.638912+00",
		member_id: "3",
		story_id: "6",
		rating: "5",
	},
];

const defaultMembersImagesPaths = [
	"img/members/gabriel-silverio-u3WmDyKGsrY-unsplash.jpg",
	"",
	"img/members/kieran-white-NKN25UfGfkQ-unsplash.jpg",
];

const defaultStoriesImagesPaths = [
	"img/stories/clarke-sanders-nM4gJR-7RWQ-unsplash.jpg",
	"img/stories/benigno-hoyuela-72zsd_fnxYc-unsplash.jpg",
	"img/stories/bruce-christianson-86AN3JFiBsY-unsplash.jpg",
	"img/stories/sam-mar-OQOKSsj8QME-unsplash.jpg",
	"img/stories/antonino-visalli-RNiBLy7aHck-unsplash.jpg",
	"img/stories/guy-stevens-dEGu-oCuB1Y-unsplash.jpg",
];

const prepareDataWithImages = (async () => {
	const defaultMembersWithImages = await Promise.all(
		defaultMembers.map(async (a, i) => {
			const imagePath = defaultMembersImagesPaths[i];
			const imageFile = imagePath ? await createImageFileFromUrl(imagePath) : "";
			const [member, userAuthData] = a;
			return { member, imageFile, userAuthData };
		})
	);

	const defaultStoriesWithImages = await Promise.all(
		defaultStories.map(async (a, i) => {
			const imagePath = defaultStoriesImagesPaths[i];
			const imageFile = imagePath ? await createImageFileFromUrl(imagePath) : "";
			return {
				story: a,
				imageFile,
				notify: false,
			};
		})
	);

	return { defaultMembersWithImages, defaultStoriesWithImages };
})();

export default function useResetDatabaseToDefault() {
	const queryClient = useQueryClient();
	const { user } = useUser();

	let userCredentials;
	if (user.is_admin) userCredentials = adminMemberCredentials;
	else {
		const previousLogged = defaultMembers.filter(a => a[1].email === user.email);
		if (previousLogged.length) {
			userCredentials = previousLogged[0][1];
		}
	}

	const { mutate, isPending } = useMutation({
		mutationFn: () => resetDatabaseToDefaults(userCredentials),
		onSuccess: () => {
			queryClient.invalidateQueries();
		},
	});

	return { mutate, isPending };
}

async function resetDatabaseToDefaults(userCredentials) {
	await deleteMembers();

	await deleteInvitations();

	const { defaultMembersWithImages, defaultStoriesWithImages } = await prepareDataWithImages;

	await addMembers(defaultMembersWithImages);

	await addStories(defaultStoriesWithImages);

	await addRatings(defaultRatings);

	if (userCredentials) {
		if (userCredentials.email.startsWith("admin")) {
			await updateMember({ member: adminMemberProfileData });
		}
		await login(userCredentials);
	}
}
