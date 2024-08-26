"use client";

import { useContext } from "react";
import { SchoolContext } from "../../_components/school-context";
import { redirect } from "next/navigation";

export function AssertSchoolOwner() {
  const { school, role } = useContext(SchoolContext);

  if (role !== "manager") return redirect(`/schools/${school._id}`);

  return { school, role };
}
