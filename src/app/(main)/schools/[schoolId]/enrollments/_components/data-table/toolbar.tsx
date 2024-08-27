"use client";

import {
  DataTableContext,
  DataTableFacetedFilter,
  DataTableViewOptions,
} from "@/components/data-table";
import { useContext } from "react";
import { DeleteEnrollmentsSheet } from "./delete-enrollments-sheet";
import { AcceptEnrollmentsSheet } from "./accept-enrollments-sheet";
import { Input } from "@/components/ui/input";

const roles = [
  {
    value: "student",
    label: "Student",
  },
  {
    value: "teacher",
    label: "Teacher",
  },
];

export function EnrollmentsDataTableToolbar() {
  const { table } = useContext(DataTableContext);

  const selectedEnrollments = table
    .getSelectedRowModel()
    .rows.map((row) => row.original._id);

  return (
    <div className="flex flex-col gap-2.5 md:flex-row md:justify-between">
      <Input
        placeholder="Filter assignees..."
        value={(table.getColumn("Assignee")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("Assignee")?.setFilterValue(event.target.value)
        }
        className="md:w-[300px] lg:w-[350px]"
      />
      <div className="flex flex-wrap gap-2">
        {table.getSelectedRowModel().rows.length !== 0 && (
          <>
            <DeleteEnrollmentsSheet enrollmentIds={selectedEnrollments} />
            <AcceptEnrollmentsSheet enrollmentIds={selectedEnrollments} />
          </>
        )}
        <DataTableFacetedFilter
          column={table.getColumn("Role")}
          title="Role"
          options={roles}
        />
        <DataTableViewOptions />
      </div>
    </div>
  );
}
