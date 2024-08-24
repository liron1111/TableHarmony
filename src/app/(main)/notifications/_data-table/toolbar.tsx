"use client";

import {
  DataTableContext,
  DataTableFilter,
  DataTableViewOptions,
} from "@/components/data-table";
import { useContext } from "react";
import { DeleteNotificationsSheet } from "./sheets/delete-notifications-sheet";
import { UpdateNotificationsButton } from "./forms/update-notifications-form";

export function NotificationsDataTableToolbar() {
  const { table } = useContext(DataTableContext);

  const selectedNotifications = table
    .getSelectedRowModel()
    .rows.map((row) => row.original._id);

  return (
    <div className="flex flex-col gap-2.5 md:flex-row md:justify-between">
      <DataTableFilter />
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
        <DataTableViewOptions />
      </div>
    </div>
  );
}
