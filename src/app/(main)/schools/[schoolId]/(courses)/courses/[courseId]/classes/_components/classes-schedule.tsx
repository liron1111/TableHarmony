"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../../../../../../convex/_generated/api";
import { useCourse } from "../../../_components/providers/course-provider";
import { format } from "date-fns";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UpdateClassSheet } from "./update-class-sheet";
import { DeleteClassDialog } from "./delete-class-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import { cardStyles } from "@/styles/common";
import Image from "next/image";
import { DAYS_OF_WEEK } from "@/config/contants";

export function ClassesSchedule() {
  const { course } = useCourse();
  const classes = useQuery(api.courses.getCourseClasses, {
    courseId: course?._id!,
  });

  if (!classes) return null;

  if (classes.length === 0) {
    return (
      <div className={cardStyles}>
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-balance text-lg font-semibold md:text-xl">
            No Classes Available
          </span>
          <p className="text-balance text-muted-foreground">
            There are currently no classes listed for this course.
          </p>
        </div>
        <Image
          src="/assets/educator.svg"
          alt="Empty course list"
          width={250}
          height={250}
        />
      </div>
    );
  }

  const organized = Object.groupBy(classes, (c) => c.day.toLowerCase());

  return (
    <div className="flex flex-col space-y-12">
      {DAYS_OF_WEEK.map((day) => {
        const dayClasses = organized[day];
        if (!dayClasses) return null;

        return (
          <div className="space-y-3" key={day}>
            <h2 className="text-lg font-semibold capitalize">{day}</h2>
            {dayClasses.map((c) => (
              <Card key={c._id}>
                <CardHeader>
                  <CardTitle>
                    {format(c.from, "HH:mm")} - {format(c.to, "HH:mm")}
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                  <DeleteClassDialog classId={c._id}>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button variant="ghost" aria-label="delete class">
                          <TrashIcon className="size-4 text-destructive" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Delete</TooltipContent>
                    </Tooltip>
                  </DeleteClassDialog>
                  <UpdateClassSheet classId={c._id}>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button variant="ghost" aria-label="edit class">
                          <PencilIcon className="size-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Edit</TooltipContent>
                    </Tooltip>
                  </UpdateClassSheet>
                </CardFooter>
              </Card>
            ))}
          </div>
        );
      })}
    </div>
  );
}
