"use client";

import { api } from "../../../../../convex/_generated/api";

import { cardStyles, gridStyles } from "@/styles/common";

import Image from "next/image";
import { SchoolCard } from "./school-card";
import { useQuery } from "convex/react";

export function SchoolList({ query, page }: { query: string; page: number }) {
  const schools = useQuery(api.schools.getUserSchools);

  if (!schools) return;

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

  return (
    <div className={gridStyles}>
      {schools.map((school) => (
        <SchoolCard key={school._id} school={school} />
      ))}
    </div>
  );
}
