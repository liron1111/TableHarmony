import { Doc, Id } from "../../../../../convex/_generated/dataModel";
import { api } from "../../../../../convex/_generated/api";
import { useQuery } from "convex/react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  EllipsisVerticalIcon,
  GraduationCapIcon,
  SettingsIcon,
  TrashIcon,
  UsersIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { DeleteSchoolDialog } from "./delete-school-dialog";

export function SchoolCard({ school }: { school: Doc<"schools"> }) {
  const user = useQuery(api.users.getCurrentUser);

  return (
    <div className="relative duration-200 hover:shadow-md">
      <Link href={`/schools/${school._id}`} aria-label="school">
        <Card>
          <CardHeader>
            <CardTitle>{school.name}</CardTitle>
            <CardDescription className="line-clamp-4">
              {school.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center gap-10 md:flex-row">
              <div className="flex items-center gap-2">
                <UsersIcon /> 0 students
              </div>
              <div className="flex items-center gap-2">
                <GraduationCapIcon /> 0 teachers
              </div>
            </div>
          </CardContent>
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
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost" aria-label="menu">
          <EllipsisVerticalIcon className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-1">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:!text-muted-foreground"
          asChild
        >
          <Link href={`/schools/${schoolId}/school-settings`}>
            <SettingsIcon className="mr-2 size-4" /> Settings
          </Link>
        </Button>
        <Separator className="my-1" />
        <DeleteSchoolDialog schoolId={schoolId}>
          <Button
            variant="ghost"
            className="flex w-full items-center justify-start text-destructive hover:!text-destructive"
          >
            <TrashIcon className="mr-2 size-4" /> Delete school
          </Button>
        </DeleteSchoolDialog>
      </PopoverContent>
    </Popover>
  );
}
