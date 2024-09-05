import { api } from "../../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../../convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";

import { createMetadata } from "@/utils/metadata";
import { ClassroomProvider } from "./_components/providers/classroom-provider";
import { ClassroomMembershipProvider } from "./_components/providers/classroom-membership-provider";

export async function generateMetadata({
  params,
}: {
  params: { classroomId: Id<"classrooms"> };
}) {
  const classroom = await fetchQuery(api.classrooms.getClassroom, {
    classroomId: params.classroomId,
  });

  const school = await fetchQuery(api.schools.getSchool, {
    schoolId: classroom?.schoolId!,
  });

  return createMetadata({
    title: `${classroom?.name} | ${school?.name}`,
    description: classroom?.description,
  });
}

export default function ClassroomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClassroomProvider>
      <ClassroomMembershipProvider>
        <div>{children}</div>
      </ClassroomMembershipProvider>
    </ClassroomProvider>
  );
}
