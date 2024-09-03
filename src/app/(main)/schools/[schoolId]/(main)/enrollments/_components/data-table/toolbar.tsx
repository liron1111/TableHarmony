"use client";

import {
  DataTableContext,
  DataTableFacetedFilter,
} from "@/components/data-table";
import { useContext } from "react";
import { DeleteEnrollmentsDialog } from "./delete-enrollments-dialog";
import { AcceptEnrollmentsDialog } from "./accept-enrollments-dialog";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, Trash2Icon, CheckIcon } from "lucide-react";

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
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 transform text-neutral-500" />
        <Input
          placeholder="Search"
          value={
            (table.getColumn("Assignee")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("Assignee")?.setFilterValue(event.target.value)
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Actions <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col">
              <DropdownMenuItem asChild>
                <DeleteEnrollmentsDialog enrollmentIds={selectedEnrollments}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-destructive hover:text-destructive"
                  >
                    <Trash2Icon className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </DeleteEnrollmentsDialog>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <AcceptEnrollmentsDialog enrollmentIds={selectedEnrollments}>
                  <Button variant="ghost" className="w-full justify-start">
                    <CheckIcon className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                </AcceptEnrollmentsDialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
