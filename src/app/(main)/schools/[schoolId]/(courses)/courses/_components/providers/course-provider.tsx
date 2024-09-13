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
import { AuthorizationError } from "@/utils/errors";

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

  const isSchoolManager = schoolMembership?.role === "manager";
  const isHomepage = pathname === `/schools/${schoolId}/courses/${courseId}`;
  const isGuest = membership === null;

  if (!isSchoolManager && !isHomepage && isGuest)
    redirect(`/schools/${schoolId}/courses/${courseId}`);

  return (
    <CourseContext.Provider value={{ course, membership }}>
      {children}
    </CourseContext.Provider>
  );
}
