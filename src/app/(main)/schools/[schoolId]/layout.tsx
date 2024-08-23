import { School } from "./_components/school-context";

export default function SchoolLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { schoolId: string };
}) {
  return <School schoolId={params.schoolId}>{children}</School>;
}
