"use client";

import { api } from "../../../../../convex/_generated/api";
import { useQuery } from "convex/react";

import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { cardStyles, gridStyles } from "@/styles/common";
import { SchoolCard } from "./school-card";
import { Doc, Id } from "../../../../../convex/_generated/dataModel";

type Role = "manager" | "teacher" | "student";

export function SchoolList({ searchQuery }: { searchQuery: string }) {
  const schools = useQuery(api.schools.getUserSchools);
  const user = useQuery(api.users.getCurrentUser);

  if (!schools) return <SchoolListSkeleton />;

  if (schools.length === 0) {
    return (
      <div className={cardStyles}>
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-balance text-lg font-semibold md:text-xl">
            No school available
          </span>
          <p className="text-balance text-muted-foreground">
            It looks like you haven&apos;t joined or created any schools yet.
          </p>
        </div>
        <Image
          src="/assets/education.svg"
          alt="schools"
          width="250"
          height="250"
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

  const organized = Object.groupBy(
    displaySchools,
    ({ membership }) => membership.role
  );

  return (
    <div className="flex flex-col space-y-12">
      {Object.keys(organized).map((role) => (
        <div className="space-y-3" key={role}>
          <h2 className="text-lg font-semibold capitalize">{role} schools</h2>
          <CategorySchoolList
            schools={organized[role as Role]!}
            userId={user?._id!}
          />
        </div>
      ))}
    </div>
  );
}

function CategorySchoolList({
  schools,
  userId,
}: {
  schools: Doc<"schools">[];
  userId: Id<"users">;
}) {
  return (
    <div className={gridStyles}>
      {schools.map((school) => (
        <SchoolCard key={school._id} school={school} userId={userId} />
      ))}
    </div>
  );
}

export function SchoolListSkeleton() {
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
