"use client";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { useClassroom } from "./_components/providers/classroom-provider";

export function ClassroomHeader() {
  const { classroom } = useClassroom();

  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>{classroom?.name}</PageHeaderHeading>
        <PageHeaderDescription>{classroom?.description}</PageHeaderDescription>
      </PageHeader>
    </div>
  );
}
