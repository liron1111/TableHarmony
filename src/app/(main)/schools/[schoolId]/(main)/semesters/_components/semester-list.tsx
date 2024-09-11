"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../../../../convex/_generated/api";
import { Doc, Id } from "../../../../../../../../convex/_generated/dataModel";

import { useParams } from "next/navigation";
import { cardStyles, gridStyles } from "@/styles/common";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { compareAsc, format } from "date-fns";
import { CalendarIcon, PencilIcon, TrashIcon } from "lucide-react";
import { UpdateSemesterSheet } from "./update-semester-sheet";
import { DeleteSemesterDialog } from "./delete-semester-dialog";
import { Button } from "@/components/ui/button";
import { useMembership } from "../../../_components/providers/membership-provider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function SemesterList() {
  const { schoolId } = useParams();

  const semesters = useQuery(api.schools.getSchoolSemesters, {
    schoolId: schoolId as Id<"schools">,
  });

  if (!semesters) return <SemesterListSkeleton />;

  if (semesters.length === 0) {
    return (
      <div className={cardStyles}>
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-balance text-lg font-semibold md:text-xl">
            No semester available
          </span>
          <p className="text-balance text-muted-foreground">
            It looks like this school doesn&apos;t have any semesters yet.
          </p>
        </div>
        <Image
          src="/assets/online-calendar.svg"
          alt="semesters"
          width="250"
          height="250"
        />
      </div>
    );
  }

  return (
    <div className={gridStyles}>
      {semesters
        .sort((a, b) => compareAsc(a.from, b.from))
        .map((semester) => (
          <SemesterCard semester={semester} key={semester._id} />
        ))}
    </div>
  );
}

function SemesterCard({ semester }: { semester: Doc<"semesters"> }) {
  const { membership } = useMembership();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold">{semester.name}</CardTitle>
        <CardDescription className="flex items-center text-muted-foreground">
          <CalendarIcon className="mr-2 size-4" />
          {format(semester.from, "LLL dd")} - {format(semester.to, "LLL dd, y")}
        </CardDescription>
      </CardHeader>
      {membership?.role === "manager" && (
        <CardFooter>
          <DeleteSemesterDialog semesterId={semester._id}>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="ghost" aria-label="delete">
                  <TrashIcon className="size-4 text-destructive" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          </DeleteSemesterDialog>
          <UpdateSemesterSheet semesterId={semester._id}>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="ghost" aria-label="edit">
                  <PencilIcon className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit</TooltipContent>
            </Tooltip>
          </UpdateSemesterSheet>
        </CardFooter>
      )}
    </Card>
  );
}

function SemesterListSkeleton() {
  return (
    <div className={gridStyles}>
      {new Array(6).fill("").map((v, idx) => (
        <div key={idx} className="h-[125px] space-y-6 rounded border p-4">
          <div className="flex space-x-2">
            <Skeleton className="size-9 rounded" />
            <div className="space-y-1">
              <Skeleton className="h-3 w-24 rounded" />
              <Skeleton className="h-3 w-16 rounded" />
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <Skeleton className="h-3 w-16 rounded" />
            <Skeleton className="h-3 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
