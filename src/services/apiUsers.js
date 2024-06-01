import { getMemberBy } from "./apiMembers";
import supabase from "./supabase";

export async function register(userAuthData) {
	const { data, error } = await supabase.auth.signUp(userAuthData);

	if (error) throw new Error(error.message);

	return data;
}

export async function login({ email, password }) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) throw new Error(error.code);

	const user = data?.user;

	const member = await getMemberBy("uid", user.id);

	return { session: data.session, user: { ...user, ...member } };
}

export async function getCurrentUser() {
	const { data: sessionData } = await supabase.auth.getSession();

	if (!sessionData.session) return;

	const { data, error } = await supabase.auth.getUser();
	if (error) throw new Error(error.message);

	const user = data?.user;

	const member = await getMemberBy("uid", user.id);

	return { ...user, ...member };
}

export async function updateUserPasswordWithOldPasswordCheck(passwordData) {
	const { data, error } = await supabase.rpc("update_password", passwordData);

	if (error || data === "incorrect") throw new Error(error?.message || data);
}

export async function updateUserPassword(passwordO) {
	await supabase.auth.updateUser(passwordO);
}

export async function deleteUser(uid) {
	await supabase.functions.invoke("delete-users", {
		body: JSON.stringify({ uid }),
	});
}

export async function deleteAllButAdminUsers() {
	await supabase.functions.invoke("delete-users", {
		body: JSON.stringify({ all: true }),
	});
}

export async function logout() {
	const { error } = await supabase.auth.signOut();
	if (error) throw new Error(error.message);
}
