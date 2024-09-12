import { api } from "../../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../../convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";

import { createMetadata } from "@/utils/metadata";

import { CourseProvider } from "../_components/providers/course-provider";
import { CourseHeader } from "./_components/course-header";

export async function generateMetadata({
  params,
}: {
  params: { courseId: Id<"courses"> };
}) {
  const course = await fetchQuery(api.courses.getCourse, {
    courseId: params.courseId,
  });

  const school = await fetchQuery(api.schools.getSchool, {
    schoolId: course?.schoolId!,
  });

  return createMetadata({
    title: `${course?.name} | ${school?.name}`,
    description: course?.description,
  });
}

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CourseProvider>
      <CourseHeader />
      {children}
    </CourseProvider>
  );
}
