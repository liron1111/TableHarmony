import { School } from "./_components/school-context";
import { Sidebar } from "./_components/sidebar";

export default function SchoolLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { schoolId: string };
}) {
  return (
    <School schoolId={params.schoolId}>
      <div className="flex">
        <div className="pr-4">
          <Sidebar />
        </div>
        <div className="container">{children}</div>
      </div>
    </School>
  );
}
