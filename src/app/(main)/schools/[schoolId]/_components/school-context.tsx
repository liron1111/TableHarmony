"use client";

import { useQuery } from "convex/react";
import { Doc, Id } from "../../../../../../convex/_generated/dataModel";
import { api } from "../../../../../../convex/_generated/api";

import React, { createContext, useContext } from "react";
import { redirect } from "next/navigation";

interface SchoolContextType {
  school: Doc<"schools">;
  membership: Doc<"schoolMemberships"> | null;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

export function useSchool() {
  const context = useContext(SchoolContext);
  if (context === undefined) {
    throw new Error("useSchool must be used within a SchoolProvider");
  }
  return context;
}

export function SchoolProvider({
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

  if (school === undefined || membership === undefined) return null;
  if (!school || (!school.isPublic && !membership)) redirect("/schools");

  const value: SchoolContextType = { school, membership };

  return (
    <SchoolContext.Provider value={value}>{children}</SchoolContext.Provider>
  );
}
