import { ConfigurationPanel } from "@/components/configuration-panel";

import { DeleteSchoolButton } from "./delete-school-button";

export default function DangerPage() {
  return (
    <div>
      <ConfigurationPanel variant="destructive" title="Delete school">
        <div className="flex flex-col gap-4">
          <span>You can delete your school if you&apos;re done with it </span>
          <DeleteSchoolButton />
        </div>
      </ConfigurationPanel>
    </div>
  );
}
