"use client";

import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { FunctionReference } from "convex/server";
import { useQuery } from "convex/react";

import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { cardStyles, gridStyles } from "@/styles/common";
import { SchoolCard } from "./school-card";

type Query = FunctionReference<
  "query",
  "public",
  {},
  | {
      _id: Id<"schools">;
      _creationTime: number;
      image: string;
      name: string;
      creatorId: Id<"users">;
      description: string;
      isPublic: boolean;
    }[]
  | null,
  string | undefined
>;

export function SchoolList({
  searchQuery,
  query,
}: {
  searchQuery: string;
  query: Query;
}) {
  const schools = useQuery(query);
  //TODO: add pagination

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
    <div className={gridStyles}>
      {displaySchools.map((school) => (
        <SchoolCard key={school._id} school={school} />
      ))}
    </div>
  );
}

export function UserSchoolListWrapper({
  searchQuery,
}: {
  searchQuery: string;
}) {
  return (
    <SchoolList query={api.schools.getUserSchools} searchQuery={searchQuery} />
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
