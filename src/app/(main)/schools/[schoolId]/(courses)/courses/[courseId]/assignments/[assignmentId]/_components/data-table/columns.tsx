"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table";
import { Checkbox } from "@/components/ui/checkbox";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileIcon } from "lucide-react";

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
          <Link
            href={`/schools/${row.original.schoolId}/members/${user?._id}`}
            className="text-blue-500 underline-offset-2 hover:underline"
          >
            {user?.name}
          </Link>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return row.original.user.name.toLowerCase().includes(value.toLowerCase());
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
    accessorKey: "submission",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Submission" />
    ),
    cell: ({ row }) => {
      const submission = row.original;

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              View Submission
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submission Details</DialogTitle>
              <DialogDescription>
                Submitted on{" "}
                {new Date(submission._creationTime).toLocaleString()}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="mb-2 font-semibold">Comment:</h4>
                <p className="text-sm">
                  {submission.comment || "No comment provided"}
                </p>
              </div>
              {submission.file && (
                <div>
                  <h4 className="mb-2 font-semibold">Attached File:</h4>
                  <a
                    href={submission.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-500 hover:underline"
                  >
                    <FileIcon className="mr-2 h-4 w-4" />
                    View File
                  </a>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
