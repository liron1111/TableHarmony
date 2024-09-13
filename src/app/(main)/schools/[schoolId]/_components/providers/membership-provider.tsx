"use client";

import { useQuery } from "convex/react";
import { Doc, Id } from "../../../../../../../convex/_generated/dataModel";
import { api } from "../../../../../../../convex/_generated/api";

import React, { createContext, useContext } from "react";
import { redirect, useParams, usePathname } from "next/navigation";
import { useSchool } from "./school-provider";

interface MembershipContextType {
  membership?: Doc<"schoolMemberships"> | null;
}

const MembershipContext = createContext<MembershipContextType>({});

function isManagerRoute(currentPath: string, schoolId: string) {
  const prefix = `/schools/${schoolId}/`;

  const managerPaths = [
    `${prefix}school-settings`,
    `${prefix}memberships`,
    `${prefix}enrollments`,
    `${prefix}school-settings/danger`,
  ];

  return managerPaths.some((path) => currentPath === path);
}

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
  const { school } = useSchool();
  const user = useQuery(api.users.getCurrentUser);

  const path = usePathname();
  const { schoolId } = useParams();

  const membership = useQuery(api.schoolMemberships.getSchoolMembership, {
    schoolId: schoolId as Id<"schools">,
    userId: user?._id!,
  });

  const isOnboarding = path.includes("onboarding");
  const isHomepage = path === `/schools/${schoolId}`;
  const isGuest = membership === null;

  if (membership) {
    if (!isOnboarding && !membership.boardingComplete)
      redirect(`/schools/${schoolId}/onboarding`);

    if (isOnboarding && membership.boardingComplete)
      redirect(`/schools/${schoolId}`);
  }

  if (school) {
    if (isGuest && !school.isPublic) redirect("/schools");

    if (isGuest && !isHomepage) redirect(`/schools/${school._id}`);

    if (membership?.role !== "manager" && isManagerRoute(path, school._id))
      redirect(`/schools/${school._id}`);
  }

  return (
    <MembershipContext.Provider value={{ membership }}>
      {children}
    </MembershipContext.Provider>
  );
}
