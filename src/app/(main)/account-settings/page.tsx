import { ConfigurationPanel } from "@/components/configuration-panel";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { UpdateNameForm } from "./update-name-form";

export default function AccountSettingsPage() {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Account settings</PageHeaderHeading>
      </PageHeader>

      <ConfigurationPanel title="Display name">
        <div className="flex flex-col gap-4">
          <span>To update your display name, please fill the form below</span>
          <UpdateNameForm />
        </div>
      </ConfigurationPanel>
    </div>
  );
}
