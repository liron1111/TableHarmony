"use client";

import { useQuery } from "convex/react";

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

function isManagerRoute(
  currentPath: string,
  schoolId: string,
  courseId: string
) {
  const prefix = `/schools/${schoolId}/courses/${courseId}/`;

  const managerPaths = [
    `${prefix}course-settings`,
    `${prefix}course-settings/danger`,
    `${prefix}course-settings/memberships`,
    `${prefix}analytics`,
    `${prefix}enrollments`,
  ];

  return managerPaths.some((path) => currentPath === path);
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

  const membership = useQuery(
    api.courseMemberships.getCourseMembership,
    user && courseId
      ? {
          courseId: courseId as Id<"courses">,
          userId: user._id,
        }
      : "skip"
  );

  const isManager =
    schoolMembership?.role === "manager" || membership?.role === "manager";
  const isHomepage = pathname === `/schools/${schoolId}/courses/${courseId}`;
  const isGuest = membership === null;

  if (!isManager && !isHomepage && isGuest)
    redirect(`/schools/${schoolId}/courses/${courseId}`);

  if (
    !isManager &&
    !isGuest &&
    isManagerRoute(pathname, schoolId as string, courseId as string)
  )
    redirect(`/schools/${schoolId}/courses/${courseId}`);

  return (
    <CourseContext.Provider value={{ course, membership }}>
      {children}
    </CourseContext.Provider>
  );
}
