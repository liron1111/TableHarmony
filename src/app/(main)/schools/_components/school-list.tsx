"use client";

import { api } from "../../../../../convex/_generated/api";
import { useQuery } from "convex/react";

import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { cardStyles, gridStyles } from "@/styles/common";
import { SchoolCard } from "./school-card";

export function SchoolList({ query }: { query: string }) {
  const schools = useQuery(api.schools.getUserSchools);

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
        <span className="font-semibold">Uhoh, you do not own any school</span>
      </div>
    );
  }

  const displaySchools = schools.filter(
    (school) =>
      school.name.toLowerCase().includes(query) ||
      school.description.toLowerCase().includes(query)
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
    <div className={gridStyles}>
      {displaySchools.map((school) => (
        <SchoolCard key={school._id} school={school} />
      ))}
    </div>
  );
}

function SchoolListSkeleton() {
  return (
    <div className={gridStyles}>
      {new Array(6).fill("").map((v, idx) => (
        <div key={idx} className="h-[125px] space-y-6 rounded border p-4">
          <div className="flex space-x-2">
            <Skeleton className="size-9 rounded" />
            <div className="space-y-1">
              <Skeleton className="h-3 w-24 rounded" />
              <Skeleton className="h-3 w-16 rounded" />
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <Skeleton className="h-3 w-16 rounded" />
            <Skeleton className="h-3 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
