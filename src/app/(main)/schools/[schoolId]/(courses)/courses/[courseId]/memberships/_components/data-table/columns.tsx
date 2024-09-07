"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table";
import { Checkbox } from "@/components/ui/checkbox";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge, BadgeProps } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteMembershipsDialog } from "./delete-memberships-dialog";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Doc } from "../../../../../../../../../../../convex/_generated/dataModel";

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
      return <MemberCell user={row.original.user} role={row.original.role} />;
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
    header: () => <p>Actions</p>,
    cell: ({ row }) => {
      const role = row.original.role;

      if (role === "manager") {
        return <div className="py-5" />;
      }

      return (
        <DeleteMembershipsDialog membershipsIds={[row.original._id]}>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="ghost" size="icon" aria-label="Delete">
                <Trash2Icon className="size-4 text-destructive" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete</TooltipContent>
          </Tooltip>
        </DeleteMembershipsDialog>
      );
    },
  },
];

function MemberCell({
  user,
  role,
}: {
  user: Doc<"users">;
  role: "teacher" | "student";
}) {
  const { schoolId } = useParams();

  return (
    <div className="flex items-center gap-2">
      <Avatar className="size-5">
        <AvatarImage src={user?.image} alt={`${user?.name} avatar`} />
        <AvatarFallback className="text-xs">SC</AvatarFallback>
      </Avatar>
      <Link
        className="text-blue-500 underline-offset-2 hover:underline"
        href={`/schools/${schoolId}/members/${user._id}`}
      >
        {user?.name}
      </Link>
    </div>
  );
}
