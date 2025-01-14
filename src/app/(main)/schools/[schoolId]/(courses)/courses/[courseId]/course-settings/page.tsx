import { ConfigurationPanel } from "@/components/configuration-panel";

import { UpdateNameForm } from "./_components/forms/update-name";
import { UpdateDescriptionForm } from "./_components/forms/update-description";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { UpdateInfoForm } from "./_components/forms/update-info";
import { UpdateImageForm } from "./_components/forms/update-image";

export default function CourseSettingsPage() {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Course settings</PageHeaderHeading>
        <PageHeaderDescription>
          Manage course settings and set preferences.
        </PageHeaderDescription>
      </PageHeader>
      <div className="space-y-8">
        <ConfigurationPanel title="Course name">
          <div className="flex w-full flex-col gap-4">
            <span>To update course name, please fill the form below</span>
            <UpdateNameForm />
          </div>
        </ConfigurationPanel>
        <ConfigurationPanel title="Course image">
          <div className="flex w-full flex-col gap-4">
            <span>To update course image, please upload new image below</span>
            <UpdateImageForm />
          </div>
        </ConfigurationPanel>
        <ConfigurationPanel title="Course description">
          <div className="flex w-full flex-col gap-4">
            <span>
              To update course description, please fill the form below
            </span>
            <UpdateDescriptionForm />
          </div>
        </ConfigurationPanel>

        <ConfigurationPanel title="Course info">
          <UpdateInfoForm />
        </ConfigurationPanel>
      </div>
    </div>
  );
}
