import { SchoolProvider } from "./_components/school-context";
import { Sidebar } from "./_components/sidebar";

import { createMetadata } from "@/utils/metadata";

import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";

export async function generateMetadata({
  params,
}: {
  params: { schoolId: string };
}) {
  const school = await fetchQuery(api.schools.getSchool, {
    schoolId: params.schoolId as Id<"schools">,
  });

  return createMetadata({
    title: school?.name ?? "School",
    description: school?.description ?? "school description",
  });
}

export default function SchoolLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { schoolId: string };
}) {
  return (
    <SchoolProvider schoolId={params.schoolId}>
      <div className="flex">
        <Sidebar />
        <div className="relative w-full overflow-x-hidden">{children}</div>
      </div>
    </SchoolProvider>
  );
}
