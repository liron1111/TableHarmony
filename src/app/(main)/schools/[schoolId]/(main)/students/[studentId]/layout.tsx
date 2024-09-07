import { api } from "../../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../../convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";

import { createMetadata } from "@/utils/metadata";

import { StudentProvider } from "./_components/student-provider";
import { StudentHeader } from "./_components/student-header";

export async function generateMetadata({
  params,
}: {
  params: { schoolId: Id<"schools">; studentId: Id<"users"> };
}) {
  const student = await fetchQuery(api.users.getUserById, {
    userId: params.studentId,
  });

  const school = await fetchQuery(api.schools.getSchool, {
    schoolId: params.schoolId,
  });

  return createMetadata({
    title: `${student?.name} | ${school?.name}`,
  });
}

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StudentProvider>
      <StudentHeader />
      <div className="pb-4">{children}</div>
    </StudentProvider>
  );
}
