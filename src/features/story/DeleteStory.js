import { useDeleteStory } from "./useStoryDetails";
import Popup from "../../ui/Popup";
import ConfirmActionPopup from "../../ui/ConfirmActionPopup";

export default function DeleteStory({ storyId, storyimageUrl }) {
	const buttonLabel = "Delete Story";

	return (
		<Popup>
			<Popup.Open>
				{openRef => (
					<button ref={openRef} className="btn btn-2 m-t-big">
						{buttonLabel}
					</button>
				)}
			</Popup.Open>
			<Popup.Window>
				<ConfirmActionPopup
					messageCode="delete story"
					buttonLabel={buttonLabel}
					hook={useDeleteStory}
					mutateProps={{ storyId, storyimageUrl }}
				/>
			</Popup.Window>
		</Popup>
	);
}
