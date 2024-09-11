"use client";

import { useParams } from "next/navigation";

import { api } from "../../../../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../../../../convex/_generated/dataModel";

import { useQuery } from "convex/react";

export function EventsList() {
  const { courseId } = useParams();

  const events = useQuery(api.courses.getCourseEvents, {
    courseId: courseId as Id<"courses">,
  });

  return <div>{JSON.stringify(events, null, 2)}</div>;
}
