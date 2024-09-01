import { SchoolHeader } from "./_components/school-header";
import { SchoolInfo } from "./_components/school-info";

export default function SchoolsPage({
  params,
}: {
  params: { schoolId: string };
}) {
  return (
    <div className="container">
      <SchoolHeader />
      <SchoolInfo />
    </div>
  );
}
