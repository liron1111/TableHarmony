"use client";

import { useMembership } from "@/app/(main)/schools/[schoolId]/_components/providers/membership-provider";

import {
  DataTableContext,
  DataTableFacetedFilter,
} from "@/components/data-table";
import { Input } from "@/components/ui/input";
import { useContext } from "react";
import { DeleteMembershipsSheet } from "./delete-memberships-sheet";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const { membership } = useMembership();

  const selectedMemberships = table
    .getSelectedRowModel()
    .rows.map((row) => row.original._id);

  return (
    <div className="flex flex-col gap-2.5 md:flex-row md:justify-between">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 transform text-neutral-500" />
        <Input
          placeholder="Search"
          value={(table.getColumn("Member")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("Member")?.setFilterValue(event.target.value)
          }
          className="pl-10 md:w-[300px] lg:w-[350px]"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <DataTableFacetedFilter
          column={table.getColumn("Role")}
          title="Role"
          options={roles}
        />
        {table.getSelectedRowModel().rows.length !== 0 && (
          <>
            {!selectedMemberships.includes(membership?._id) && (
              <DeleteMembershipsSheet membershipIds={selectedMemberships}>
                <Button variant="destructive">
                  Delete {selectedMemberships.length} selected
                </Button>
              </DeleteMembershipsSheet>
            )}
          </>
        )}
      </div>
    </div>
  );
}
