import useDocumentTitle from "../hooks/useDocumentTitle";
import BasePageLayout from "../ui/BasePageLayout";
import MembersMain from "../features/members/MembersMain";

export default function Members() {
	useDocumentTitle("Members");
	
	return (
		<BasePageLayout lowerHeader={false}>
			<MembersMain />
		</BasePageLayout>
	);
}
