"use client";

import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { useClassroom } from "./_components/providers/classroom-provider";
import { useClassroomMembership } from "./_components/providers/classroom-membership-provider";
import { ExitClassroomDialog } from "./_components/exit-classroom-dialog";
import { JoinClassroomDialog } from "./_components/join-classroom-dialog";

export function ClassroomHeader() {
  const { classroom } = useClassroom();
  const { classroomMembership } = useClassroomMembership();

  return (
    <PageHeader>
      <PageHeaderHeading>{classroom?.name}</PageHeaderHeading>
      <PageHeaderDescription>{classroom?.description}</PageHeaderDescription>
      <PageActions>
        {classroomMembership ? (
          <ExitClassroomDialog />
        ) : (
          <JoinClassroomDialog />
        )}
      </PageActions>
    </PageHeader>
  );
}
