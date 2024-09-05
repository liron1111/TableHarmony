import { Id } from "../../../../../convex/_generated/dataModel";
import { api } from "../../../../../convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

import { SchoolProvider } from "./_components/providers/school-provider";
import { MembershipProvider } from "./_components/providers/membership-provider";

import { createMetadata } from "@/utils/metadata";

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
      <MembershipProvider>{children}</MembershipProvider>
    </SchoolProvider>
  );
}
