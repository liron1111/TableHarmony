"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../../../convex/_generated/dataModel";

import { useParams } from "next/navigation";
import Image from "next/image";

import { format } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const DAYS_OF_WEEK = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export function Schedule() {
  const { memberId, schoolId } = useParams();

  const classes = useQuery(api.classes.getUserClasses, {
    userId: memberId as Id<"users">,
    schoolId: schoolId as Id<"schools">,
  });

  if (!classes) return null;

  if (classes.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-2 pt-6 text-center">
          <CardTitle className="text-lg font-semibold md:text-xl">
            Empty Schedule
          </CardTitle>
          <p className="text-balance text-muted-foreground">
            No classes are currently scheduled for this member.
          </p>
          <Image
            src="/assets/educator.svg"
            alt="Empty schedule"
            width={250}
            height={250}
          />
        </CardContent>
      </Card>
    );
  }

  // Restructure the data
  const schedule = DAYS_OF_WEEK.reduce(
    (acc, day) => {
      acc[day] = [];
      return acc;
    },
    {} as Record<string, Array<{ class: any; course: any }>>
  );

  classes.forEach(({ classes: courseClasses, course }) => {
    courseClasses.forEach((classItem) => {
      schedule[classItem.day].push({ class: classItem, course });
    });
  });

  // Sort classes within each day
  Object.values(schedule).forEach((dayClasses) => {
    dayClasses.sort((a, b) => a.class.from - b.class.from);
  });

  return (
    <div className="flex flex-col space-y-6">
      {DAYS_OF_WEEK.map((day) => (
        <Card key={day}>
          <CardHeader>
            <CardTitle className="text-xl font-semibold capitalize">
              {day}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {schedule[day].length === 0 ? (
              <p className="text-muted-foreground">No classes scheduled</p>
            ) : (
              <div className="space-y-2">
                {schedule[day].map(({ class: classItem, course }, index) => {
                  const colorIndex =
                    (index + 1 + DAYS_OF_WEEK.indexOf(day)) % 5;

                  return (
                    <Card
                      key={classItem._id}
                      className={`bg-[hsl(var(--chart-${colorIndex}))]`}
                    >
                      <CardContent className="flex items-center justify-between p-4">
                        <span className="font-medium">{course.name}</span>
                        <span>
                          {format(classItem.from, "HH:mm")} -{" "}
                          {format(classItem.to, "HH:mm")}
                        </span>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
