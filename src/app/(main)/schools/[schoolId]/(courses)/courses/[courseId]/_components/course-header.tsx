"use client";

import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

import { useCourse } from "../../_components/providers/course-provider";

export function CourseHeader() {
  const { course, membership } = useCourse();

  return (
    <PageHeader>
      <PageHeaderHeading>{course?.name}</PageHeaderHeading>
      <PageHeaderDescription>{course?.description}</PageHeaderDescription>
    </PageHeader>
  );
}
