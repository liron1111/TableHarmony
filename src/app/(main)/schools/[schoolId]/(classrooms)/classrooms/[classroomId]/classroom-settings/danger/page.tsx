import { ConfigurationPanel } from "@/components/configuration-panel";
import { DeleteClassroomButton } from "./delete-classroom-button";

export default function DangerPage() {
  return (
    <div>
      <ConfigurationPanel variant="destructive" title="Delete classroom">
        <div className="flex w-full flex-col gap-4">
          <span>
            You can delete your classroom if you&apos;re done with it{" "}
          </span>
          <DeleteClassroomButton />
        </div>
      </ConfigurationPanel>
    </div>
  );
}
