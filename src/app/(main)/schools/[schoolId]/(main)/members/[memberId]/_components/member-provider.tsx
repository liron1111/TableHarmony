"use client";

import { useQuery } from "convex/react";
import {
  Doc,
  Id,
} from "../../../../../../../../../convex/_generated/dataModel";

import React, { createContext, useContext } from "react";

import { redirect, useParams } from "next/navigation";
import { api } from "../../../../../../../../../convex/_generated/api";
import { AuthorizationError } from "@/utils/errors";

interface MemberContextType {
  member?: Doc<"users"> | null;
  membership?: Doc<"schoolMemberships"> | null;
}

const MemberContext = createContext<MemberContextType>({});

export function useMember() {
  const context = useContext(MemberContext);
  if (context === undefined) {
    throw new Error("useMember must be used within a MemberProvider");
  }
  return context;
}

export function MemberProvider({ children }: { children: React.ReactNode }) {
  const { memberId, schoolId } = useParams();

  const user = useQuery(api.users.getUserById, {
    userId: memberId as Id<"users">,
  });

  const membership = useQuery(api.schoolMemberships.getSchoolMembership, {
    userId: memberId as Id<"users">,
    schoolId: schoolId as Id<"schools">,
  });

  if (membership === null) throw new AuthorizationError();

  return (
    <MemberContext.Provider value={{ member: user, membership }}>
      {children}
    </MemberContext.Provider>
  );
}
