"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DeleteNotificationForm } from "./forms/delete-notification-form";
import { SwitchReadNotificationForm } from "./forms/switch-read-notification-form";

type Notification = any;

export const columns: ColumnDef<Notification>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: boolean) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="_id" />
    ),
  },
  {
    accessorKey: "_creationTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="_creationTime" />
    ),
    cell: ({ row }) => {
      return new Date(row.getValue("_creationTime")).toLocaleDateString(
        "en-GB"
      );
    },
    filterFn: (row, columnId, filterValue) => {
      const date = new Date(row.getValue(columnId));
      const dateString = date.toLocaleDateString("en-GB");
      return dateString.toLowerCase().includes(filterValue.toLowerCase());
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="title" />
    ),
  },
  {
    accessorKey: "isRead",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="isRead" />
    ),
    filterFn: "includesString",
  },
  {
    accessorKey: "actions",
    header: ({ column }) => <span className="sr-only">actions</span>,
    cell: ({ row }) => <Actions row={row} />,
    enableSorting: false,
  },
];

function Actions({ row }: { row: Row<Notification> }) {
  return (
    <div className="flex items-center gap-2">
      <SwitchReadNotificationForm
        notificationId={row.getValue("_id")}
        isRead={row.getValue("isRead")}
      />
      <DeleteNotificationForm notificationId={row.getValue("_id")} />
    </div>
  );
}
