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
import { useMembership } from "../../../_components/providers/membership-provider";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ClassroomHeader() {
  const { classroom } = useClassroom();
  const { classroomMembership } = useClassroomMembership();
  const { membership } = useMembership();

  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>{classroom?.name}</PageHeaderHeading>
        <PageHeaderDescription>{classroom?.description}</PageHeaderDescription>
        <PageActions>
          {membership?.role === "manager" ? (
            <Button asChild>
              <Link
                href={`/schools/${classroom?.schoolId}/classrooms/${classroom?._id}/classroom-settings`}
              >
                Classroom settings
              </Link>
            </Button>
          ) : classroomMembership ? (
            <ExitClassroomDialog />
          ) : (
            <JoinClassroomDialog />
          )}
        </PageActions>
      </PageHeader>
    </div>
  );
}
