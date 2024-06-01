import { useUser } from "../../features/authentication/useUser";
import { useGetMembers } from "./useMembers";
import { COLOR_PRIMARY } from "../../utils/constants";
import MainContainer from "../../ui/MainContainer";
import ErrorMessage from "../../ui/ErrorMessage";
import Spinner from "../../ui/Spinner";
import NoMembers from "./NoMembers";
import { DeleteMembers, DeleteMember } from "./DeleteMembers";
import MemberAvatar from "../../ui/MemberAvatar";
import styles from "./MembersMain.module.css";

export default function MembersMain() {
	const { user } = useUser();

	return <MembersList isAdmin={user.is_admin} userimageUrl={user.img_url} />;
}

function MembersContainer({ children }) {
	return (
		<MainContainer>
			<div className={styles["members-content"]}>{children}</div>
		</MainContainer>
	);
}

function MembersList({ isAdmin, userimageUrl }) {
	const { members, isPending, isConnectionError } = useGetMembers();

	if (isConnectionError)
		return (
			<MembersContainer>
				<ErrorMessage margin="10.05rem" />
			</MembersContainer>
		);
	if (isPending)
		return (
			<MembersContainer>
				<Spinner margin="4.07rem" />
			</MembersContainer>
		);
	if (members.length === 1) {
		return (
			<MainContainer>
				<NoMembers />
			</MainContainer>
		);
	}

	return (
		<MembersContainer>
			{members.map(a => !a.is_admin && <MemberCard key={a.username} member={a} isAdmin={isAdmin} />)}
			{isAdmin && <DeleteMembers userimageUrl={userimageUrl} />}
		</MembersContainer>
	);
}

function MemberCard({ member, isAdmin }) {
	const { id, uid, username, img_url, description } = member;
	const color = member.color || COLOR_PRIMARY;

	return (
		<div className={styles["member-card"]}>
			<div className={styles["member-card-content"]}>
				<MemberAvatar img={img_url} color={color} className={styles["member-card-content-img"]} />
				<div className={styles["member-card-content-data"]}>
					<h3 className={styles["member-card-content-name"]} style={{ color: color }}>
						{username}
					</h3>
					<p className={styles["member-card-content-description"]}>{description || " "}</p>
					{isAdmin && <DeleteMember memberId={id} memberimageUrl={img_url} memberUid={uid} />}
				</div>
			</div>
		</div>
	);
}
