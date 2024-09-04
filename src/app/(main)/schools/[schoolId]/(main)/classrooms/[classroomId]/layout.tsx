import { api } from "../../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../../convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";

import { createMetadata } from "@/utils/metadata";
import { ClassroomProvider } from "./_components/providers/classroom-provider";

export async function generateMetadata({
  params,
}: {
  params: { classroomId: Id<"classrooms"> };
}) {
  const classroom = await fetchQuery(api.classrooms.getClassroom, {
    classroomId: params.classroomId,
  });

  return createMetadata({
    title: classroom?.name ?? "Classroom",
    description: classroom?.description ?? "classroom description",
  });
}

export default function ClassroomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClassroomProvider>{children}</ClassroomProvider>;
}
