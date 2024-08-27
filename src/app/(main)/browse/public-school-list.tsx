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
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-balance text-lg font-semibold md:text-xl">
            No Public Schools Listed
          </span>
          <p className="text-balance text-muted-foreground">
            There are currently no public schools available for browsing.
          </p>
        </div>
        <Image
          src="/assets/no-data.svg"
          alt="No public schools available"
          width={250}
          height={250}
        />
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
        <span className="font-semibold">No schools found</span>
        <Image
          src="/assets/no-data.svg"
          width="200"
          height="200"
          alt="no schools placeholder image"
        />
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
