"use client";

import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

import { useClassroom } from "./_components/providers/classroom-provider";
import { useMembership } from "../../../_components/providers/membership-provider";
import { useClassroomMembership } from "./_components/providers/classroom-membership-provider";

import { JoinClassroomDialog } from "./_components/join-classroom-dialog";
import { ExitClassroomDialog } from "./_components/exit-classroom-dialog";

export function ClassroomHeader() {
  const { classroom } = useClassroom();
  const { classroomMembership } = useClassroomMembership();
  const { membership } = useMembership();

  return (
    <PageHeader>
      <PageHeaderHeading>{classroom?.name}</PageHeaderHeading>
      <PageHeaderDescription>{classroom?.description}</PageHeaderDescription>
      <PageActions>
        {!classroomMembership ? (
          membership?.role !== "manager" && <JoinClassroomDialog />
        ) : (
          <ExitClassroomDialog />
        )}
      </PageActions>
    </PageHeader>
  );
}
