"use client";

import { useQuery } from "convex/react";
import {
  Doc,
  Id,
} from "../../../../../../../../../convex/_generated/dataModel";

import React, { createContext, useContext } from "react";

import { redirect, useParams } from "next/navigation";
import { api } from "../../../../../../../../../convex/_generated/api";

interface TeacherContextType {
  teacher?: Doc<"users"> | null;
  membership?: Doc<"schoolMemberships"> | null;
}

const TeacherContext = createContext<TeacherContextType>({});

export function useTeacher() {
  const context = useContext(TeacherContext);
  if (context === undefined) {
    throw new Error("useStudent must be used within a StudentProvider");
  }
  return context;
}

export function TeacherProvider({ children }: { children: React.ReactNode }) {
  const { teacherId, schoolId } = useParams();

  const user = useQuery(api.users.getUserById, {
    userId: teacherId as Id<"users">,
  });

  const membership = useQuery(api.schoolMemberships.getMembership, {
    userId: teacherId as Id<"users">,
    schoolId: schoolId as Id<"schools">,
  });

  if (membership === null || (membership && membership.role !== "teacher"))
    redirect(`/schools/${schoolId}`);

  return (
    <TeacherContext.Provider value={{ teacher: user, membership }}>
      {children}
    </TeacherContext.Provider>
  );
}
