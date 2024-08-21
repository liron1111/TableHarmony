import { ConfigurationPanel } from "@/components/configuration-panel";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";

import { UpdateNameForm } from "./update-name-form";
import { EditBioForm } from "./edit-bio-form";

export default function AccountSettingsPage() {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Account settings</PageHeaderHeading>
      </PageHeader>

      <div className="space-y-8">
        <ConfigurationPanel title="Display name">
          <div className="flex flex-col gap-4">
            <span>To update your display name, please fill the form below</span>
            <UpdateNameForm />
          </div>
        </ConfigurationPanel>
        <ConfigurationPanel title="Bio">
          <EditBioForm />
        </ConfigurationPanel>
      </div>
    </div>
  );
}
