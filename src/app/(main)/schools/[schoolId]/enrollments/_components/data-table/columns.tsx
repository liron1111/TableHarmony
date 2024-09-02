"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table";
import { Checkbox } from "@/components/ui/checkbox";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Doc } from "../../../../../../../../convex/_generated/dataModel";
import { DeleteEnrollmentsDialog } from "./delete-enrollments-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { CheckIcon, Trash2Icon } from "lucide-react";
import { AcceptEnrollmentsDialog } from "./accept-enrollments-dialog";

type Enrollment = Doc<"schoolEnrollments"> & {
  user: Doc<"users">;
};

export const columns: ColumnDef<Enrollment>[] = [
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
      const user = row.original?.user;

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
    filterFn: (row, id, value) => {
      const user = row.original?.user;
      if (!user.name) return false;

      return user.name.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    accessorKey: "Role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const role = row.original.role;

      let variant: BadgeProps["variant"];
      switch (role) {
        case "teacher":
          variant = "default";
          break;
        default:
          variant = "outline";
          break;
      }

      return <Badge variant={variant}>{role}</Badge>;
    },

    filterFn: (row, id, value) => {
      return value.includes(row.original.role);
    },
  },
  {
    accessorKey: "_creationTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
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
    accessorKey: "actions",
    header: () => <p>Actions</p>,
    cell: ({ row }) => {
      return (
        <div>
          <DeleteEnrollmentsDialog enrollmentIds={[row.original._id]}>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="ghost" size="icon" aria-label="Delete">
                  <Trash2Icon className="size-4 text-destructive" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          </DeleteEnrollmentsDialog>
          <AcceptEnrollmentsDialog enrollmentIds={[row.original._id]}>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="ghost" size="icon" aria-label="Accept">
                  <CheckIcon className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Accept</TooltipContent>
            </Tooltip>
          </AcceptEnrollmentsDialog>
        </div>
      );
    },
  },
];
