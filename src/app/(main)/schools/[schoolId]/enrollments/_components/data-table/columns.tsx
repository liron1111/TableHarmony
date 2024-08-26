"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table";
import { Checkbox } from "@/components/ui/checkbox";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Doc } from "../../../../../../../../convex/_generated/dataModel";

export const columns: ColumnDef<any>[] = [
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
    accessorKey: "Assignee",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assignee" />
    ),
    cell: ({ row }) => {
      const user: Doc<"users"> = row.original?.user;

      return (
        <div className="flex items-center gap-2">
          <Avatar className="size-5">
            <AvatarImage src={user?.image} alt={`${user?.name} avatar`} />
            <AvatarFallback className="text-xs">SC</AvatarFallback>
          </Avatar>
          <span>{user?.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "Role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const role = row.original.role;

      return (
        <Badge variant={role === "student" ? "default" : "outline"}>
          {role}
        </Badge>
      );
    },

    filterFn: (row, id, value) => {
      return value.includes(row.original.role);
    },
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
];
