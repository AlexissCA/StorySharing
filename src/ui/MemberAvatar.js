import MemberAvatarDefault from "./MemberAvatarDefault";
import styles from "./MemberAvatar.module.css";

export default function MemberAvatar({ openRef = null, img, color, className = "" }) {
	return img ? (
		<img
			ref={openRef}
			className={`${styles["member-avatar"]} ${className}`}
			src={img}
			aria-label="Member Icon"
			style={{ borderColor: color }}
		/>
	) : (
		<MemberAvatarDefault openRef={openRef} className={`${styles["member-avatar"]} ${className}`} color={color} />
	);
}
