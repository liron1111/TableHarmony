import { ComingSoon } from "@/components/coming-soon";
import { SchoolHeader } from "./_components/school-header";

export default function SchoolsPage({
  params,
}: {
  params: { schoolId: string };
}) {
  return (
    <div className="container">
      <SchoolHeader />
      <ComingSoon />
    </div>
  );
}
