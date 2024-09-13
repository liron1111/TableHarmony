"use client";

import { api } from "../../../../../../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../../../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";

import {
  DataTable,
  DataTableBody,
  DataTablePagination,
  DataTableSkeleton,
} from "@/components/data-table";
import { columns } from "./columns";

import { useParams } from "next/navigation";

export function SubmissionsDataTable() {
  const { assignmentId } = useParams();
  const data = useQuery(api.courseAssignments.getSubmissions, {
    assignmentId: assignmentId as Id<"courseAssignments">,
  });

  if (!data) return <DataTableSkeleton />;

  return (
    <DataTable data={data} columns={columns}>
      <DataTableBody />
      <DataTablePagination />
    </DataTable>
  );
}
