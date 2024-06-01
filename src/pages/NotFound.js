import useDocumentTitle from "../hooks/useDocumentTitle";
import BasePageLayout from "../ui/BasePageLayout";
import ProblemMessage from "../ui/ProblemMessage";

export default function NotFound({ errorCode = "not found" }) {
	useDocumentTitle("");

	return (
		<BasePageLayout footerMargin={false}>
			<ProblemMessage errorCode={errorCode} />
		</BasePageLayout>
	);
}
