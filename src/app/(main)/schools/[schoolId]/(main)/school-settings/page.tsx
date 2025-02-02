import { ConfigurationPanel } from "@/components/configuration-panel";

import { UpdateNameForm } from "./_components/forms/update-name";
import { UpdateDescriptionForm } from "./_components/forms/update-description";
import { UpdateVisibilityForm } from "./_components/forms/update-visibility";
import { UpdateInfoForm } from "./_components/forms/update-info";
import { UpdateImageForm } from "./_components/forms/update-image";
import { SchoolImage } from "./_components/school-image";

export default function SchoolSettingsPage() {
  return (
    <div className="space-y-8">
      <ConfigurationPanel title="School name">
        <div className="flex w-full flex-col gap-4">
          <span>To update school name, please fill the form below</span>
          <UpdateNameForm />
        </div>
      </ConfigurationPanel>
      <ConfigurationPanel title="School image">
        <div className="flex w-full flex-col gap-4">
          <span>To update school image, please upload new image below</span>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <SchoolImage />
            <UpdateImageForm />
          </div>
        </div>
      </ConfigurationPanel>
      <ConfigurationPanel title="School visibility">
        <div className="flex w-full flex-col gap-4">
          <span>
            To update school visibility, please toggle the switch below
          </span>
          <UpdateVisibilityForm />
        </div>
      </ConfigurationPanel>
      <ConfigurationPanel title="School description">
        <div className="flex w-full flex-col gap-4">
          <span>To update school description, please fill the form below</span>
          <UpdateDescriptionForm />
        </div>
      </ConfigurationPanel>

      <ConfigurationPanel title="School info">
        <UpdateInfoForm />
      </ConfigurationPanel>
    </div>
  );
}
