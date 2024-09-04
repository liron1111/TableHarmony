"use client";

import { api } from "../../../../../../../../convex/_generated/api";
import { useQuery } from "convex/react";

import { useSchool } from "@/app/(main)/schools/[schoolId]/_components/providers/school-provider";

import { cardStyles, gridStyles } from "@/styles/common";
import { ClassroomCard } from "./classroom-card";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";

export function ClassroomList() {
  const { school } = useSchool();
  const classrooms = useQuery(api.classrooms.getSchoolClassrooms, {
    schoolId: school?._id!,
  });

  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  if (!classrooms) return <ClassroomListSkeleton />;

  if (classrooms.length === 0) {
    return (
      <div className={cardStyles}>
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-balance text-lg font-semibold md:text-xl">
            No Classrooms Available
          </span>
          <p className="text-balance text-muted-foreground">
            There are currently no classrooms listed for this school.
          </p>
        </div>
        <Image
          src="/assets/educator.svg"
          alt="Empty classroom list"
          width={250}
          height={250}
        />
      </div>
    );
  }

  const displayClassrooms = classrooms.filter(
    (classroom) =>
      classroom.name.toLowerCase().includes(query.toLowerCase()) ||
      classroom.description.toLowerCase().includes(query.toLowerCase())
  );

  if (displayClassrooms.length === 0) {
    return (
      <div className={cardStyles}>
        <span className="font-semibold">No matching classrooms</span>
        <Image
          src="/assets/educator.svg"
          width="200"
          height="200"
          alt="No results found"
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className={gridStyles}>
        {displayClassrooms.map((classroom) => (
          <ClassroomCard key={classroom._id} classroom={classroom} />
        ))}
      </div>
    </div>
  );
}

function ClassroomListSkeleton() {
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
