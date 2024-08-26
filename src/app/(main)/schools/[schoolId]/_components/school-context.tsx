"use client";

import { useQuery } from "convex/react";
import { Doc, Id } from "../../../../../../convex/_generated/dataModel";
import { api } from "../../../../../../convex/_generated/api";

import { createContext } from "react";
import { redirect } from "next/navigation";

interface SchoolContextType {
  school: Doc<"schools">;
  role: "student" | "teacher" | "manager" | "guest";
}

export const SchoolContext = createContext<SchoolContextType>(
  {} as SchoolContextType
);

export function School({
  children,
  schoolId,
}: {
  children: React.ReactNode;
  schoolId: string;
}) {
  const user = useQuery(api.users.getCurrentUser);

  const school = useQuery(api.schools.getSchool, {
    schoolId: schoolId as Id<"schools">,
  });

  const membership = useQuery(api.schoolMemberships.getMembership, {
    schoolId: schoolId as Id<"schools">,
    userId: user?._id as Id<"users">,
  });

  if (school === null) redirect("/schools");

  if (!school) return <></>;

  if (!membership && !school.isPublic) redirect("/schools");

  return (
    <SchoolContext.Provider
      value={{ school, role: membership?.role ?? "guest" }}
    >
      {children}
    </SchoolContext.Provider>
  );
}
