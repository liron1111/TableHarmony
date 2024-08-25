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
        <Sidebar />
        <div className="w-full">{children}</div>
      </div>
    </School>
  );
}
