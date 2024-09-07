import { api } from "../../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../../convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";

import { createMetadata } from "@/utils/metadata";
import { TeacherProvider } from "./_components/teacher-provider";
import { TeacherHeader } from "./_components/teacher-header";

export async function generateMetadata({
  params,
}: {
  params: { schoolId: Id<"schools">; teacherId: Id<"users"> };
}) {
  const teacher = await fetchQuery(api.users.getUserById, {
    userId: params.teacherId,
  });

  const school = await fetchQuery(api.schools.getSchool, {
    schoolId: params.schoolId,
  });

  return createMetadata({
    title: `${teacher?.name} | ${school?.name}`,
  });
}

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TeacherProvider>
      <TeacherHeader />
      <div className="pb-4">{children}</div>
    </TeacherProvider>
  );
}
