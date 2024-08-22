import { ConfigurationPanel } from "@/components/configuration-panel";

import { UpdateNameForm } from "./_components/update-name-form";
import { Id } from "../../../../../../convex/_generated/dataModel";

export default function SchoolSettingsPage({
  params,
}: {
  params: { schoolId: string };
}) {
  const schoolId = params.schoolId as Id<"schools">;

  return (
    <div>
      <div className="space-y-8">
        <ConfigurationPanel title="School name">
          <div className="flex flex-col gap-4">
            <span>To update school name, please fill the form below</span>
            <UpdateNameForm schoolId={schoolId} />
          </div>
        </ConfigurationPanel>
      </div>
    </div>
  );
}
