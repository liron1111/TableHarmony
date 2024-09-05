import { ConfigurationPanel } from "@/components/configuration-panel";

import { UpdateNameForm } from "./_components/forms/update-name";
import { UpdateDescriptionForm } from "./_components/forms/update-description";

export default function ClassroomSettingsPage() {
  return (
    <div className="space-y-8">
      <ConfigurationPanel title="School name">
        <div className="flex w-full flex-col gap-4">
          <span>To update classroom name, please fill the form below</span>
          <UpdateNameForm />
        </div>
      </ConfigurationPanel>

      <ConfigurationPanel title="School description">
        <div className="flex w-full flex-col gap-4">
          <span>
            To update classroom description, please fill the form below
          </span>
          <UpdateDescriptionForm />
        </div>
      </ConfigurationPanel>
    </div>
  );
}
