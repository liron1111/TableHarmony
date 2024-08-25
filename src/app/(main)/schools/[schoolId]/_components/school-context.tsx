"use client";

import { useQuery } from "convex/react";
import { Doc, Id } from "../../../../../../convex/_generated/dataModel";
import { api } from "../../../../../../convex/_generated/api";

import { createContext } from "react";
import { redirect } from "next/navigation";

interface SchoolContext {
  school: Doc<"schools">;
}

export const SchoolContext = createContext<SchoolContext>({
  school: {} as Doc<"schools">,
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

    //TODO: add a skeleton
    if (!school) return <></>;

    return (
      <SchoolContext.Provider value={{ school }}>
        {children}
      </SchoolContext.Provider>
    );
  } catch (e) {
    redirect("/schools");
  }
}
