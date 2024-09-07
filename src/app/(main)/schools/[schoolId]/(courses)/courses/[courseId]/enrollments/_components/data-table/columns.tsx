"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table";
import { Checkbox } from "@/components/ui/checkbox";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DeleteEnrollmentsDialog } from "./delete-enrollments-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import { AcceptEnrollmentsDialog } from "./accept-enrollments-dialog";
import { useParams } from "next/navigation";
import Link from "next/link";
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
      return <MemberCell user={row.original.user} />;
    },
    filterFn: (row, id, value) => {
      return row.original.user.name.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    accessorKey: "_creationTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Enrolled at" />
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
        return null;
      }

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
                  <PlusCircleIcon className="size-4" />
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

function MemberCell({ user }: { user: Doc<"users"> }) {
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
