"use client";

import {
  DataTableContext,
  DataTableFacetedFilter,
  DataTableViewOptions,
} from "@/components/data-table";
import { Input } from "@/components/ui/input";
import { useContext } from "react";
import { DeleteMembershipsSheet } from "./delete-memberships-sheet";

const roles = [
  {
    value: "student",
    label: "Student",
  },
  {
    value: "teacher",
    label: "Teacher",
  },
  {
    value: "manager",
    label: "Manager",
  },
];

export function MembershipsDataTableToolbar() {
  const { table } = useContext(DataTableContext);

  const selectedMemberships = table
    .getSelectedRowModel()
    .rows.map((row) => row.original._id);

  return (
    <div className="flex flex-col gap-2.5 md:flex-row md:justify-between">
      <Input
        placeholder="Filter members..."
        value={(table.getColumn("Member")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("Member")?.setFilterValue(event.target.value)
        }
        className="md:w-[300px] lg:w-[350px]"
      />
      <div className="flex flex-wrap gap-2">
        {table.getSelectedRowModel().rows.length !== 0 && <></>}
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
