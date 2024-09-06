import { ConfigurationPanel } from "@/components/configuration-panel";
import { DeleteCourseButton } from "./delete-course-button";

export default function DangerPage() {
  return (
    <div>
      <ConfigurationPanel variant="destructive" title="Delete course">
        <div className="flex w-full flex-col gap-4">
          <span>You can delete your course if you&apos;re done with it </span>
          <DeleteCourseButton />
        </div>
      </ConfigurationPanel>
    </div>
  );
}
