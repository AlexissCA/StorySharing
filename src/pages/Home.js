import useDocumentTitle from "../hooks/useDocumentTitle";
import BasePageLayout from "../ui/BasePageLayout";
import HomeMain from "../features/main/HomeMain";

export default function Home() {
	useDocumentTitle("Home");

	return (
		<BasePageLayout lowerHeader={false}>
			<HomeMain />
		</BasePageLayout>
	);
}
