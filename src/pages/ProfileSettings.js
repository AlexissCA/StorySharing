import useDocumentTitle from "../hooks/useDocumentTitle";
import BasePageLayout from "../ui/BasePageLayout";
import ProfileSettingsForm from "../features/members/profile-settings/ProfileSettingsForm";

export default function ProfileSettings() {
	useDocumentTitle("Profile Settings");

	return (
		<BasePageLayout footerMargin={false}>
			<ProfileSettingsForm />
		</BasePageLayout>
	);
}
