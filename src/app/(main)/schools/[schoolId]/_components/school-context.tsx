"use client";

import { useQuery } from "convex/react";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { api } from "../../../../../../convex/_generated/api";

import { createContext } from "react";

interface School {
  _id: Id<"schools">;
  _creationTime: number;
  creatorId: Id<"users">;
  name: string;
  description: string;
  isPublic: boolean;
  image: string;
}

interface SchoolContext {
  school: School;
}

export const SchoolContext = createContext<SchoolContext>({
  school: {} as School,
});

export function School({
  children,
  schoolId,
}: {
  children: React.ReactNode;
  schoolId: string;
}) {
  const school = useQuery(api.schools.getSchool, {
    schoolId: schoolId as Id<"schools">,
  })!;

  return (
    <SchoolContext.Provider value={{ school }}>
      {children}
    </SchoolContext.Provider>
  );
}
