"use client";

import {
  DataTableContext,
  DataTableFacetedFilter,
} from "@/components/data-table";
import { Input } from "@/components/ui/input";
import { useContext } from "react";
import { SearchIcon } from "lucide-react";

export function MembershipsDataTableToolbar() {
  const { table } = useContext(DataTableContext);

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
          options={[
            {
              value: "student",
              label: "Student",
            },
            {
              value: "manager",
              label: "Manager",
            },
          ]}
        />
      </div>
    </div>
  );
}
