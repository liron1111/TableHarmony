import { ConfigurationPanel } from "@/components/configuration-panel";

import { DeleteSchoolDialog } from "../../../_components/delete-school-dialog";
import { Button } from "@/components/ui/button";
import { Id } from "../../../../../../../convex/_generated/dataModel";

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
          <DeleteSchoolDialog schoolId={schoolId}>
            <Button className="w-fit" variant="destructive">
              Delete school
            </Button>
          </DeleteSchoolDialog>
        </div>
      </ConfigurationPanel>
    </div>
  );
}
