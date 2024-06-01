import useResetDatabaseToDefault from "./useResetDatabaseToDefaults";
import SpinnerOverlay from "../../ui/SpinnerOverlay";
import styles from "./ResetDatabaseToDefaultsButton.module.css";

export default function ResetDatabaseToDefaultsButton() {
	const { mutate, isPending } = useResetDatabaseToDefault();

	return (
		<>
			<button onClick={mutate} className={`btn btn-1 ${styles["reload-btn"]}`}>
				Reset DB To Test Data
				<br />
				<small className={`info ${styles["reload-btn-info"]}`}>*for testing purposes only</small>
			</button>
			{isPending && <SpinnerOverlay />}
		</>
	);
}
