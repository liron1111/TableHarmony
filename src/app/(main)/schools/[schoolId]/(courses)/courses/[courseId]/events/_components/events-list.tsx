"use client";

import { useParams } from "next/navigation";

import { api } from "../../../../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../../../../convex/_generated/dataModel";

import { useQuery } from "convex/react";
import { cardStyles } from "@/styles/common";
import Image from "next/image";
import { ComingSoon } from "@/components/coming-soon";

export function EventsList() {
  const { courseId } = useParams();

  const events = useQuery(api.courses.getCourseEvents, {
    courseId: courseId as Id<"courses">,
  });

  if (!events) return null;

  if (events.length === 0) {
    return (
      <div className={cardStyles}>
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-balance text-lg font-semibold md:text-xl">
            No Events Available
          </span>
          <p className="text-balance text-muted-foreground">
            There are currently no events listed for this course.
          </p>
        </div>
        <Image
          src="/assets/events.svg"
          alt="Empty event list"
          width={250}
          height={250}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <ComingSoon />
      {JSON.stringify(events, null, 4)}
    </div>
  );
}
