import useDocumentTitle from "../hooks/useDocumentTitle";
import BasePageLayout from "../ui/BasePageLayout";
import ShareStoryForm from "../features/share-story/ShareStoryForm";

export default function ShareStory() {
	useDocumentTitle("Share Story");

	return (
		<BasePageLayout footerMargin={false}>
			<ShareStoryForm />
		</BasePageLayout>
	);
}
