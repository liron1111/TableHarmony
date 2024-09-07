"use client";

import { useQuery } from "convex/react";
import {
  Doc,
  Id,
} from "../../../../../../../../../convex/_generated/dataModel";

import React, { createContext, useContext } from "react";

import { redirect, useParams } from "next/navigation";
import { api } from "../../../../../../../../../convex/_generated/api";

interface StudentContextType {
  student?: Doc<"users"> | null;
  membership?: Doc<"schoolMemberships"> | null;
}

const StudentContext = createContext<StudentContextType>({});

export function useStudent() {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error("useStudent must be used within a StudentProvider");
  }
  return context;
}

export function StudentProvider({ children }: { children: React.ReactNode }) {
  const { studentId, schoolId } = useParams();

  const user = useQuery(api.users.getUserById, {
    userId: studentId as Id<"users">,
  });

  const membership = useQuery(api.schoolMemberships.getMembership, {
    userId: studentId as Id<"users">,
    schoolId: schoolId as Id<"schools">,
  });

  if (membership === null || (membership && membership.role !== "student"))
    redirect(`/schools/${schoolId}`);

  return (
    <StudentContext.Provider value={{ student: user, membership }}>
      {children}
    </StudentContext.Provider>
  );
}
