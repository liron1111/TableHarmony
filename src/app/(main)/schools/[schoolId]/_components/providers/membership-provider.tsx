"use client";

import { useQuery } from "convex/react";
import { Doc } from "../../../../../../../convex/_generated/dataModel";
import { api } from "../../../../../../../convex/_generated/api";

import React, { createContext, useContext } from "react";
import { redirect, usePathname } from "next/navigation";
import { useSchool } from "./school-provider";

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

function isManagerRoute(currentPath: string) {
  const managerPaths = [
    "/school-settings",
    "/memberships",
    "/enrollments",
    "/school-settings/danger",
  ];

  return managerPaths.some((path) => currentPath.endsWith(path));
}

export function MembershipProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { school } = useSchool();
  const user = useQuery(api.users.getCurrentUser);

  const path = usePathname();

  const membership = useQuery(api.schoolMemberships.getMembership, {
    schoolId: school?._id!,
    userId: user?._id!,
  });

  if (membership === null && !school?.isPublic) redirect("/schools");

  if (isManagerRoute(path))
    if (school && membership?.role !== "manager")
      redirect(`/schools/${school._id}`);

  return (
    <MembershipContext.Provider value={{ membership }}>
      {children}
    </MembershipContext.Provider>
  );
}
