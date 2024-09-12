"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../../../convex/_generated/dataModel";

import { useParams } from "next/navigation";
import { cardStyles } from "@/styles/common";
import Image from "next/image";
import { ComingSoon } from "@/components/coming-soon";

export function Schedule() {
  const { memberId, schoolId } = useParams();

  const classes = useQuery(api.classes.getUserClasses, {
    userId: memberId as Id<"users">,
    schoolId: schoolId as Id<"schools">,
  });

  if (!classes) return null;

  if (classes.length === 0) {
    return (
      <div className={cardStyles}>
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-balance text-lg font-semibold md:text-xl">
            Empty Schedule
          </span>
          <p className="text-balance text-muted-foreground">
            No classes are currently scheduled for this member.
          </p>
        </div>
        <Image
          src="/assets/educator.svg"
          alt="Empty schedule"
          width={250}
          height={250}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-12">
      <ComingSoon />
      <pre>{JSON.stringify(classes, null, 2)}</pre>
    </div>
  );
}
