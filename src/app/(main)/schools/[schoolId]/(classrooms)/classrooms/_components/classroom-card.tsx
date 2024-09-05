"use client";

import { Button } from "@/components/ui/button";
import { Doc, Id } from "../../../../../../../../convex/_generated/dataModel";

import { useMembership } from "../../../_components/providers/membership-provider";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { EllipsisVerticalIcon, SettingsIcon, TrashIcon } from "lucide-react";
import { DeleteClassroomDialog } from "./delete-classroom-dialog";
import { useParams } from "next/navigation";

export function ClassroomCard({ classroom }: { classroom: Doc<"classrooms"> }) {
  const { membership } = useMembership();

  return (
    <div className="relative rounded-md transition-all duration-200 hover:shadow-md dark:border dark:hover:border-white">
      <Link
        href={`/schools/${membership?.schoolId}/classrooms/${classroom._id}`}
        aria-label="school"
      >
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Image
              alt="classroom image"
              src={classroom.image}
              width="35"
              height="35"
              className="rounded-md"
            />
            <div>
              <CardTitle>{classroom.name}</CardTitle>
              <CardDescription className="line-clamp-4">
                {classroom.description}
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      </Link>
      {membership?.role === "manager" && (
        <div className="absolute right-4 top-4 flex flex-row items-center">
          <div className="flex items-center">
            <MenuButton classroomId={classroom._id} />
          </div>
        </div>
      )}
    </div>
  );
}

function MenuButton({ classroomId }: { classroomId: Id<"classrooms"> }) {
  const [open, setOpen] = useState(false);
  const { schoolId } = useParams();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button size="icon" variant="ghost" aria-label="menu">
          <EllipsisVerticalIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link
            href={`/schools/${schoolId}/classrooms/${classroomId}/classroom-settings`}
          >
            <SettingsIcon className="mr-2 size-4" /> Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer text-red-500 hover:!text-red-500"
          onClick={() => setOpen(true)}
        >
          <TrashIcon className="mr-2 size-4" /> Delete classroom
        </DropdownMenuItem>
      </DropdownMenuContent>
      <DeleteClassroomDialog
        open={open}
        setOpen={setOpen}
        classroomId={classroomId}
      />
    </DropdownMenu>
  );
}
