"use client";

import { api } from "../../../../convex/_generated/api";
import { SchoolList } from "../schools/_components/school-list";

export function PubliSchoolListWrapper({
  searchQuery,
}: {
  searchQuery: string;
}) {
  return (
    <SchoolList
      query={api.schools.getPublicSchools}
      searchQuery={searchQuery}
    />
  );
}
