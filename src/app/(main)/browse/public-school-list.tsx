"use client";

import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";

import Image from "next/image";
import { cardStyles, gridStyles } from "@/styles/common";
import { SchoolListSkeleton } from "../schools/_components/school-list";
import { SchoolCard } from "../schools/_components/school-card";

export function PublicSchoolList({ searchQuery }: { searchQuery: string }) {
  const schools = useQuery(api.schools.getPublicSchools);

  if (!schools) return <SchoolListSkeleton />;

  if (schools.length === 0) {
    return (
      <div className={cardStyles}>
        <Image
          src="/assets/no-data.svg"
          width="200"
          height="200"
          alt="no schools placeholder image"
        />
        <span className="font-semibold">Uhoh, no schools available</span>
      </div>
    );
  }

  const displaySchools = schools.filter(
    (school) =>
      school.name.toLowerCase().includes(searchQuery) ||
      school.description.toLowerCase().includes(searchQuery)
  );

  if (displaySchools.length === 0) {
    return (
      <div className={cardStyles}>
        <Image
          src="/assets/no-data.svg"
          width="200"
          height="200"
          alt="no schools placeholder image"
        />
        <span className="font-semibold">No schools found</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className={gridStyles}>
        {displaySchools.map((school) => (
          <SchoolCard key={school._id} school={school} />
        ))}
      </div>
    </div>
  );
}
