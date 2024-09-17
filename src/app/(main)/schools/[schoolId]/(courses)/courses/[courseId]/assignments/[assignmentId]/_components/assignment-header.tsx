"use client";

import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { useAssignment } from "./assignment-provider";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CalendarIcon, EditIcon, TrashIcon, FileIcon } from "lucide-react";
import { EditAssignmentSheet } from "./edit-assignment-sheet";
import { DeleteAssignmentDialog } from "./delete-assignment-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCourse } from "../../../../_components/providers/course-provider";
import { Id } from "../../../../../../../../../../../convex/_generated/dataModel";
import { useParams } from "next/navigation";
import { SubmitAssignmentSheet } from "./submit-assignment-sheet";
import { useQuery } from "convex/react";
import { api } from "../../../../../../../../../../../convex/_generated/api";
import { UpdateSubmissionSheet } from "./update-submission-sheet";

function formatAssignmentDate(date: Date | number) {
  const assignmentDate = new Date(date);
  const isStartOfDay =
    assignmentDate.getHours() === 0 && assignmentDate.getMinutes() === 0;
  return format(assignmentDate, isStartOfDay ? "LLL dd" : "LLL dd, HH:mm");
}

export function AssignmentHeader() {
  const { assignment } = useAssignment();

  return (
    <div className="container">
      <PageHeader>
        <Badge
          className="capitalize"
          variant={assignment?.type === "project" ? "default" : "outline"}
        >
          {assignment?.type}
        </Badge>
        <div className="flex items-center">
          <CalendarIcon className="mr-2 size-4" />
          {assignment?.date && formatAssignmentDate(assignment.date)}
        </div>

        <PageHeaderHeading>{assignment?.title}</PageHeaderHeading>
        <PageHeaderDescription>{assignment?.description}</PageHeaderDescription>

        {assignment?.file && (
          <div className="mt-2 flex items-center text-sm text-muted-foreground">
            <FileIcon className="mr-2 size-4" />
            <a
              href={assignment.file}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              View Assignment File
            </a>
          </div>
        )}
        <PageActions>
          <MembershipButtons />
        </PageActions>
      </PageHeader>
    </div>
  );
}

export function MenuButton({
  assignmentId,
}: {
  assignmentId: Id<"courseAssignments">;
}) {
  const { membership } = useCourse();

  if (membership?.role !== "manager") return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Manage</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col" align="start">
        <EditAssignmentSheet assignmentId={assignmentId}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <EditIcon className="mr-2 size-4" />
            Edit
          </DropdownMenuItem>
        </EditAssignmentSheet>
        <DeleteAssignmentDialog assignmentId={assignmentId}>
          <DropdownMenuItem
            className="text-destructive hover:!text-destructive"
            onSelect={(e) => e.preventDefault()}
          >
            <TrashIcon className="mr-2 size-4" />
            Delete
          </DropdownMenuItem>
        </DeleteAssignmentDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MembershipButtons() {
  const { membership } = useCourse();
  const { assignmentId } = useParams();

  const submission = useQuery(
    api.courseAssignmentsSubmissions.getSubmission,
    membership?.userId
      ? {
          assignmentId: assignmentId as Id<"courseAssignments">,
          userId: membership.userId,
        }
      : "skip"
  );

  if (!membership) return null;

  if (membership.role === "manager") {
    return (
      <MenuButton assignmentId={assignmentId as Id<"courseAssignments">} />
    );
  }

  if (submission) return <UpdateSubmissionSheet userId={membership.userId} />;

  return <SubmitAssignmentSheet />;
}
