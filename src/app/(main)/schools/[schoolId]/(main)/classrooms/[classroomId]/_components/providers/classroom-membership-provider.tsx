"use client";

import { api } from "../../../../../../../../../../convex/_generated/api";
import {
  Doc,
  Id,
} from "../../../../../../../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";

import React, { createContext, useContext } from "react";
import { useParams } from "next/navigation";

interface ClassroomMembershipContextType {
  classroomMembership?: Doc<"classroomMemberships"> | null;
}

const ClassroomMembershipContext =
  createContext<ClassroomMembershipContextType>({});

export function useClassroomMembership() {
  const context = useContext(ClassroomMembershipContext);
  if (context === undefined) {
    throw new Error(
      "useClassroomMembership must be used within a ClassroomMembershipProvider"
    );
  }
  return context;
}

export function ClassroomMembershipProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { classroomId } = useParams();
  const user = useQuery(api.users.getCurrentUser);

  const classroomMembership = useQuery(
    api.classroomMemberships.getClassroomMembership,
    {
      classroomId: classroomId as Id<"classrooms">,
      userId: user?._id!,
    }
  );

  return (
    <ClassroomMembershipContext.Provider value={{ classroomMembership }}>
      {children}
    </ClassroomMembershipContext.Provider>
  );
}
