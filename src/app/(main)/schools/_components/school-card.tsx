import { Doc, Id } from "../../../../../convex/_generated/dataModel";

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
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";

export function SchoolCard({
  school,
  userId,
}: {
  school: Doc<"schools">;
  userId: Id<"users">;
}) {
  const membership = useQuery(api.schoolMemberships.getSchoolMembership, {
    userId,
    schoolId: school._id,
  });

  return (
    <div className="relative rounded-md transition-all duration-200 hover:shadow-md dark:border dark:hover:border-white">
      <Link href={`/schools/${school._id}`} aria-label="school">
        <Card className="p-4">
          <CardHeader className="flex flex-row items-center gap-4 p-2">
            <Avatar>
              <AvatarImage src={school.image} alt="School" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="font-semibold">{school.name}</CardTitle>
              <CardDescription className="text-muted-foreground">
                {school.description}
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      </Link>
      {membership?.role === "manager" && (
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
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href={`/schools/${schoolId}/school-settings`}>
            <SettingsIcon className="mr-2 size-4" /> Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-red-500 hover:!text-red-500"
          onClick={() => setOpen(true)}
        >
          <TrashIcon className="mr-2 size-4" /> Delete school
        </DropdownMenuItem>
      </DropdownMenuContent>
      <DeleteSchoolDialog open={open} setOpen={setOpen} schoolId={schoolId} />
    </DropdownMenu>
  );
}
