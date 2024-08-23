"use client";

import { useQuery } from "convex/react";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { api } from "../../../../../../convex/_generated/api";

import { createContext } from "react";
import { ConvexError } from "convex/values";
import { redirect } from "next/navigation";

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
  try {
    const school = useQuery(api.schools.getSchool, {
      schoolId: schoolId as Id<"schools">,
    });

    if (!school) return;

    return (
      <SchoolContext.Provider value={{ school }}>
        {children}
      </SchoolContext.Provider>
    );
  } catch (e) {
    if (e instanceof ConvexError) redirect("/schools");
  }
}
