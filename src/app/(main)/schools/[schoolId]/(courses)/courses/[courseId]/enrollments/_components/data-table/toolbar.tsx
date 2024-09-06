"use client";

import { DataTableContext } from "@/components/data-table";
import { Input } from "@/components/ui/input";
import { useContext } from "react";
import { PlusCircleIcon, SearchIcon, TrashIcon } from "lucide-react";
import { AcceptEnrollmentsDialog } from "./accept-enrollments-dialog";
import { Button } from "@/components/ui/button";
import { DeleteEnrollmentsDialog } from "./delete-enrollments-dialog";

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
          value={(table.getColumn("Member")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("Member")?.setFilterValue(event.target.value)
          }
          className="pl-10 md:w-[300px] lg:w-[350px]"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {selectedEnrollments.length !== 0 && (
          <>
            <DeleteEnrollmentsDialog enrollmentIds={selectedEnrollments}>
              <Button variant="destructive">
                <TrashIcon className="mr-2 size-4" />
                Delete
              </Button>
            </DeleteEnrollmentsDialog>
            <AcceptEnrollmentsDialog enrollmentIds={selectedEnrollments}>
              <Button>
                <PlusCircleIcon className="mr-2 size-4" />
                Accept
              </Button>
            </AcceptEnrollmentsDialog>
          </>
        )}
      </div>
    </div>
  );
}
