import { SchoolProvider } from "./_components/providers/school-provider";
import { Sidebar } from "./_components/sidebar";

import { createMetadata } from "@/utils/metadata";

import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { MembershipProvider } from "./_components/providers/membership-provider";

export async function generateMetadata({
  params,
}: {
  params: { schoolId: Id<"schools"> };
}) {
  const school = await fetchQuery(api.schools.getSchool, {
    schoolId: params.schoolId,
  });

  return createMetadata({
    title: school?.name ?? "School",
    description: school?.description ?? "school description",
  });
}

export default function SchoolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SchoolProvider>
      <MembershipProvider>
        <div className="flex">
          <Sidebar />
          {children}
        </div>
      </MembershipProvider>
    </SchoolProvider>
  );
}
