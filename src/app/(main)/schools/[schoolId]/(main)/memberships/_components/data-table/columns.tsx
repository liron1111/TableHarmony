"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table";
import { Checkbox } from "@/components/ui/checkbox";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { DeleteMembershipsDialog } from "./delete-memberships-dialog";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { useMembership } from "../../../../_components/providers/membership-provider";

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
    accessorKey: "Member",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Member" />
    ),
    cell: ({ row }) => {
      const user = row.original.user;

      return (
        <div className="flex items-center gap-2">
          <Avatar className="size-5">
            <AvatarImage src={user?.image} alt={`${user?.name} avatar`} />
            <AvatarFallback className="text-xs">SC</AvatarFallback>
          </Avatar>
          {row.original.role !== "manager" ? (
            <Link
              href={`/schools/${row.original.schoolId}/members/${user?._id}`}
              className="text-blue-500 underline-offset-2 hover:underline"
            >
              {user?.name}
            </Link>
          ) : (
            <span>{user?.name}</span>
          )}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return row.original.user.name.toLowerCase().includes(value.toLowerCase());
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
        case "manager":
          variant = "destructive";
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
      <DataTableColumnHeader column={column} title="Joined at" />
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
    header: "Actions",
    cell: ({ row }) => <Actions membershipId={row.original._id} />,
  },
];

function Actions({ membershipId }: { membershipId: string }) {
  const { membership } = useMembership();

  if (membershipId === membership?._id) {
    return <div className="py-5" />;
  }

  return (
    <DeleteMembershipsDialog membershipIds={[membershipId]}>
      <Tooltip>
        <TooltipTrigger>
          <Button size="icon" variant="ghost">
            <TrashIcon className="size-4 text-destructive" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Delete</TooltipContent>
      </Tooltip>
    </DeleteMembershipsDialog>
  );
}
