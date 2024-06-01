import Header from "./Header";
import Footer from "./Footer";
import ResetDatabaseToDefaultsButton from "../features/reset-database-to-defaults/ResetDatabaseToDefaultsButton";

export default function BasePageLayout({ lowerHeader = true, footerMargin = true, children }) {
	return (
		<>
			<ResetDatabaseToDefaultsButton />
			<Header lower={lowerHeader} />
			{children}
			<Footer margin={footerMargin} />
		</>
	);
}
