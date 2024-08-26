"use client";

import {
  DataTableContext,
  DataTableFacetedFilter,
  DataTableViewOptions,
} from "@/components/data-table";
import { useContext } from "react";
import { DeleteEnrollmentsSheet } from "./delete-enrollments-sheet";
import { AcceptEnrollmentsSheet } from "./accept-enrollments-sheet";

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
    <div className="flex flex-col gap-2.5 md:flex-row md:justify-end">
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
