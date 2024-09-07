"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../../../../../../convex/_generated/api";
import { useCourse } from "../../../_components/providers/course-provider";

export function EventsList() {
  const { course } = useCourse();

  const events = useQuery(api.courses.getEvents, { courseId: course?._id! });

  return (
    <div>{events?.map((event) => <div key={event._id}>{event.name}</div>)}</div>
  );
}
