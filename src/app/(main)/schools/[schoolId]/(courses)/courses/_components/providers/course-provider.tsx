"use client";

import { useConvexAuth, useQuery } from "convex/react";

import { api } from "../../../../../../../../../convex/_generated/api";
import {
  Doc,
  Id,
} from "../../../../../../../../../convex/_generated/dataModel";

import React, { createContext, useContext } from "react";
import { redirect, useParams, usePathname } from "next/navigation";
import { useMembership } from "../../../../_components/providers/membership-provider";

interface CourseContextType {
  course?: Doc<"courses">;
  membership?: Doc<"courseMemberships"> | null;
}

const CourseContext = createContext<CourseContextType>({});

export function useCourse() {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error("useCourse must be used within a CourseProvider");
  }
  return context;
}

function isManagerRoute(currentPath: string) {
  const managerPaths = [
    "/course-settings",
    "/course-settings/danger",
    "/memberships",
  ];

  return managerPaths.some((path) => currentPath.endsWith(path));
}

export function CourseProvider({ children }: { children: React.ReactNode }) {
  const { membership: schoolMembership } = useMembership();
  const { courseId, schoolId } = useParams();
  const pathname = usePathname();

  const user = useQuery(api.users.getCurrentUser, {});
  const course = useQuery(api.courses.getCourse, {
    courseId: courseId as Id<"courses">,
  });

  if (course === null) redirect(`/schools/${schoolId}/courses`);

  const membership = useQuery(api.courseMemberships.getCourseMembership, {
    courseId: courseId as Id<"courses">,
    userId: user?._id!,
  });

  if (membership !== undefined && course !== undefined) {
    if (
      isManagerRoute(pathname) &&
      membership?.role !== "manager" &&
      schoolMembership?.role !== "manager"
    )
      redirect(`/schools/${schoolId}/courses/${course._id}`);
  }

  return (
    <CourseContext.Provider value={{ course, membership }}>
      {children}
    </CourseContext.Provider>
  );
}
