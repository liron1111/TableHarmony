"use client";

import { redirect } from "next/navigation";
import { useSchool } from "../../_components/school-context";

export function AssertSchoolOwner() {
  const { school, membership } = useSchool();

  if (membership?.role !== "manager") return redirect(`/schools/${school._id}`);

  return { school, membership };
}
