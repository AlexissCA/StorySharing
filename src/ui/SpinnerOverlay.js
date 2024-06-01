import { createPortal } from "react-dom";
import Spinner from "./Spinner";
import styles from "./SpinnerOverlay.module.css";

export default function SpinnerOverlay() {
	return createPortal(
		<div className={styles["spinner-overlay"]}>
			<Spinner darkBg={true}/>
		</div>,
		document.body
	);
}
