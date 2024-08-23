"use client";

import { useConvexAuth, useQuery } from "convex/react";
import { api } from "../../../../../../../convex/_generated/api";

import { useContext } from "react";
import { SchoolContext } from "../../_components/school-context";
import { redirect } from "next/navigation";

export function AssertSchoolOwner() {
  const { school } = useContext(SchoolContext);
  const user = useQuery(api.users.getCurrentUser);

  const { isLoading } = useConvexAuth();

  if (isLoading || !user) return;

  if (user._id === school.creatorId) return school;

  return redirect(`/schools/${school._id}`);
}
