import { ConfigurationPanel } from "@/components/configuration-panel";

import { Id } from "../../../../../../../convex/_generated/dataModel";

import { DeleteSchoolButton } from "./delete-school-button";

export default function DangerPage({
  params,
}: {
  params: { schoolId: string };
}) {
  const schoolId = params.schoolId as Id<"schools">;

  return (
    <div>
      <ConfigurationPanel variant="destructive" title="Delete school">
        <div className="flex flex-col gap-4">
          <span>You can delete your project if you&apos;re done with it </span>
          <DeleteSchoolButton schoolId={schoolId} />
        </div>
      </ConfigurationPanel>
    </div>
  );
}
