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
import { CalendarIcon, PencilIcon, TrashIcon, FileIcon } from "lucide-react";
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
          <MenuButton />
        </PageActions>
      </PageHeader>
    </div>
  );
}

function MenuButton() {
  const { assignment } = useAssignment();
  const { membership } = useCourse();

  if (membership?.role !== "manager") return null;

  if (!assignment?._id) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Manage</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col" align="start">
        <EditAssignmentSheet assignmentId={assignment._id}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <PencilIcon className="mr-2 size-4" />
            Edit
          </DropdownMenuItem>
        </EditAssignmentSheet>
        <DeleteAssignmentDialog assignmentId={assignment._id}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <TrashIcon className="mr-2 size-4 text-destructive" />
            Delete
          </DropdownMenuItem>
        </DeleteAssignmentDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
