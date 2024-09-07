"use client";

import {
  DataTableContext,
  DataTableFacetedFilter,
} from "@/components/data-table";
import { useContext } from "react";
import { DeleteNotificationsSheet } from "./delete-notifications-sheet";
import { UpdateNotificationsButton } from "./update-notifications-form";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export function NotificationsDataTableToolbar() {
  const { table } = useContext(DataTableContext);

  const selectedNotifications = table
    .getSelectedRowModel()
    .rows.map((row) => row.original._id);

  return (
    <div className="flex flex-col gap-2.5 md:flex-row md:justify-between">
      <div className="relative">
        <SearchIcon className="absolute right-3 top-1/2 size-4 -translate-y-1/2 transform text-neutral-500" />
        <Input
          placeholder="Search"
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="md:w-[300px] lg:w-[350px]"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {table.getSelectedRowModel().rows.length !== 0 && (
          <>
            <UpdateNotificationsButton
              notificationsIds={selectedNotifications}
            />
            <DeleteNotificationsSheet
              notificationsIds={selectedNotifications}
            />
          </>
        )}
        <DataTableFacetedFilter
          column={table.getColumn("isRead")}
          title="Read"
          options={[
            { label: "Read", value: "true" },
            { label: "Unread", value: "false" },
          ]}
        />
      </div>
    </div>
  );
}
