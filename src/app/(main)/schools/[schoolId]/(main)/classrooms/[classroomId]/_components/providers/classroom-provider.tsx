"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../../../../../../convex/_generated/api";
import {
  Doc,
  Id,
} from "../../../../../../../../../../convex/_generated/dataModel";

import React, { createContext, useContext } from "react";
import { redirect, useParams } from "next/navigation";

interface ClassroomContextType {
  classroom?: Doc<"classrooms">;
}

const ClassroomContext = createContext<ClassroomContextType>({});

export function useClassroom() {
  const context = useContext(ClassroomContext);
  if (context === undefined) {
    throw new Error("useClassroom must be used within a ClassroomProvider");
  }
  return context;
}

export function ClassroomProvider({ children }: { children: React.ReactNode }) {
  const { classroomId, schoolId } = useParams();

  const classroom = useQuery(api.classrooms.getClassroom, {
    classroomId: classroomId as Id<"classrooms">,
  });

  if (classroom === null) redirect(`/schools/${schoolId}`);

  return (
    <ClassroomContext.Provider value={{ classroom }}>
      {children}
    </ClassroomContext.Provider>
  );
}
