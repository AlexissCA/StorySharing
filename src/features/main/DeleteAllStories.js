import { useDeleteStories } from "./useStories";
import Popup from "../../ui/Popup";
import ConfirmActionPopup from "../../ui/ConfirmActionPopup";

export default function DeleteAllStories({ className }) {
	const buttonLabel = "Delete All Stories";

	return (
		<Popup>
			<Popup.Open>
				{openRef => (
					<button ref={openRef} className={`btn btn-2 ${className}`}>
						{buttonLabel}
					</button>
				)}
			</Popup.Open>
			<Popup.Window>
				<ConfirmActionPopup messageCode="delete all stories" buttonLabel={buttonLabel} hook={useDeleteStories} />
			</Popup.Window>
		</Popup>
	);
}
