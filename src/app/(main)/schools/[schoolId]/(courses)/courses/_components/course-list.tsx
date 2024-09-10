"use client";

import { api } from "../../../../../../../../convex/_generated/api";
import { useQuery } from "convex/react";

import { useSchool } from "@/app/(main)/schools/[schoolId]/_components/providers/school-provider";

import { CourseCard } from "./course-card";

import { cardStyles, gridStyles } from "@/styles/common";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";

export function CourseList() {
  const { school } = useSchool();
  const courses = useQuery(api.schools.getSchoolCourses, {
    schoolId: school?._id!,
  });

  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  if (!courses) return <CourseListSkeleton />;

  if (courses.length === 0) {
    return (
      <div className={cardStyles}>
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-balance text-lg font-semibold md:text-xl">
            No Courses Available
          </span>
          <p className="text-balance text-muted-foreground">
            There are currently no courses listed for this school.
          </p>
        </div>
        <Image
          src="/assets/educator.svg"
          alt="Empty course list"
          width={250}
          height={250}
        />
      </div>
    );
  }

  const displayCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(query.toLowerCase()) ||
      course.description.toLowerCase().includes(query.toLowerCase())
  );

  if (displayCourses.length === 0) {
    return (
      <div className={cardStyles}>
        <span className="font-semibold">No matching courses</span>
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
        {displayCourses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
}

function CourseListSkeleton() {
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
