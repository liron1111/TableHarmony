"use client";

import { useQuery } from "convex/react";
import { Doc, Id } from "../../../../../../../convex/_generated/dataModel";
import { api } from "../../../../../../../convex/_generated/api";

import React, { createContext, useContext } from "react";
import { redirect, useParams } from "next/navigation";

interface SchoolContextType {
  school?: Doc<"schools">;
}

const SchoolContext = createContext<SchoolContextType>({});

export function useSchool() {
  const context = useContext(SchoolContext);
  if (context === undefined) {
    throw new Error("useSchool must be used within a SchoolProvider");
  }
  return context;
}

export function SchoolProvider({ children }: { children: React.ReactNode }) {
  const { schoolId }: { schoolId: Id<"schools"> } = useParams();

  const school = useQuery(api.schools.getSchool, { schoolId });

  if (school === null) redirect("/schools");

  return (
    <SchoolContext.Provider value={{ school }}>
      {children}
    </SchoolContext.Provider>
  );
}
