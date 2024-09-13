"use client";

import { useQuery } from "convex/react";
import {
  Doc,
  Id,
} from "../../../../../../../../../../../convex/_generated/dataModel";
import { api } from "../../../../../../../../../../../convex/_generated/api";

import React, { createContext, useContext } from "react";
import { redirect, useParams } from "next/navigation";
import { PublicError } from "@/utils/errors";

interface AssignmentContextType {
  assignment?: Doc<"courseAssignments">;
}

const AssignmentContext = createContext<AssignmentContextType>({});

export function useAssignment() {
  const context = useContext(AssignmentContext);
  if (context === undefined) {
    throw new Error("useAssignment must be used within an AssignmentProvider");
  }
  return context;
}

export function AssignmentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { schoolId, courseId, assignmentId } = useParams();

  const assignment = useQuery(api.courseAssignments.getAssignment, {
    assignmentId: assignmentId as Id<"courseAssignments">,
  });

  if (assignment === null)
    redirect(`/schools/${schoolId}/courses/${courseId}/assignments`);

  return (
    <AssignmentContext.Provider value={{ assignment }}>
      {children}
    </AssignmentContext.Provider>
  );
}
