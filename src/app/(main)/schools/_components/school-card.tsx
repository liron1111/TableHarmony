"use client";

import { Doc, Id } from "../../../../../convex/_generated/dataModel";
import { api } from "../../../../../convex/_generated/api";
import { useQuery } from "convex/react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EllipsisVerticalIcon, SettingsIcon, TrashIcon } from "lucide-react";
import { DeleteSchoolDialog } from "./delete-school-dialog";
import Image from "next/image";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SchoolCard({ school }: { school: Doc<"schools"> }) {
  const user = useQuery(api.users.getCurrentUser);

  return (
    <div className="relative duration-200 hover:shadow-md">
      <Link href={`/schools/${school._id}`} aria-label="school">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Image
              alt="school image"
              src={school.image}
              width="35"
              height="35"
              className="rounded-md"
            />
            <div>
              <CardTitle>{school.name}</CardTitle>
              <CardDescription className="line-clamp-4">
                {school.description}
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      </Link>
      {user?._id === school.creatorId && (
        <div className="absolute right-4 top-4 flex flex-row items-center">
          <div className="flex items-center">
            <MenuButton schoolId={school._id} />
          </div>
        </div>
      )}
    </div>
  );
}

function MenuButton({ schoolId }: { schoolId: Id<"schools"> }) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button size="icon" variant="ghost" aria-label="menu">
          <EllipsisVerticalIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href={`/schools/${schoolId}/school-settings`}>
            <SettingsIcon className="mr-2 size-4" /> Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-500 hover:!text-red-500"
          onClick={() => setOpen(true)}
        >
          <TrashIcon className="mr-2 size-4" /> Delete school
        </DropdownMenuItem>
      </DropdownMenuContent>
      <DeleteSchoolDialog open={open} setOpen={setOpen} schoolId={schoolId} />
    </DropdownMenu>
  );
}
