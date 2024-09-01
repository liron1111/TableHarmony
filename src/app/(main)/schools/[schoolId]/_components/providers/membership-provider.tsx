"use client";

import { useQuery } from "convex/react";
import { Doc, Id } from "../../../../../../../convex/_generated/dataModel";
import { api } from "../../../../../../../convex/_generated/api";

import React, { createContext, useContext } from "react";
import { useParams } from "next/navigation";

interface MembershipContextType {
  membership?: Doc<"schoolMemberships"> | null;
}

const MembershipContext = createContext<MembershipContextType>({});

export function useMembership() {
  const context = useContext(MembershipContext);
  if (context === undefined) {
    throw new Error("useMembership must be used within a MembershipProvider");
  }
  return context;
}

export function MembershipProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useQuery(api.users.getCurrentUser);
  const { schoolId }: { schoolId: Id<"schools"> } = useParams();

  const membership = useQuery(api.schoolMemberships.getMembership, {
    schoolId,
    userId: user?._id!,
  });

  return (
    <MembershipContext.Provider value={{ membership }}>
      {children}
    </MembershipContext.Provider>
  );
}
