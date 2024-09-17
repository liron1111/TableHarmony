"use client";

import { useMembership } from "@/app/(main)/schools/[schoolId]/_components/providers/membership-provider";
import { useCourse } from "../../../_components/providers/course-provider";

import { CommentList } from "./_components/comments/list";
import { SubmissionsDataTable } from "./_components/data-table/submissions";

export default function AssignmentPage() {
  const { membership: schoolMembership } = useMembership();
  const { membership } = useCourse();

  const isManager =
    schoolMembership?.role === "manager" || membership?.role === "manager";

  return (
    <div className="container space-y-20">
      {isManager && <SubmissionsDataTable />}
      <CommentList />
    </div>
  );
}
