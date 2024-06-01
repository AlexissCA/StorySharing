import supabase from "./supabase";

export async function isInvitedMember(email) {
	const { data, error } = await supabase.from("invited_members_emails").select("id").eq("email", email);
	if (error) throw new Error(error.message);
	return !!data.length;
}

export async function addInvitation(email) {
	await supabase.from("invited_members_emails").insert([{ email }]);
	// TODO: add email invitation sending with app link
}

export async function deleteInvitation(email) {
	await supabase.from("invited_members_emails").delete().eq("email", email);
}

export async function deleteInvitations() {
	await supabase.from("invited_members_emails").delete().neq("id", 0);
}
