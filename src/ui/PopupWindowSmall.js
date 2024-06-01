import CloseIcon from "./CloseIcon";
import styles from "./PopupWindowSmall.module.css";

export default function PopupWindowSmall({ popupRef, closeRef, children }) {
	return (
		<div className={styles["popup-small"]} ref={popupRef}>
			<CloseIcon className={styles["popup-small-close"]} reff={closeRef} />
			{children}
		</div>
	);
}
