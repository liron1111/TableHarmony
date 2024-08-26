"use client";

import { api } from "../../../../../../../../convex/_generated/api";
import { useQuery } from "convex/react";

import {
  DataTable,
  DataTableBody,
  DataTablePagination,
  DataTableSkeleton,
} from "@/components/data-table";

import { columns } from "./columns";
import { useContext } from "react";
import { EnrollmentsDataTableToolbar } from "./toolbar";
import { cardStyles } from "@/styles/common";
import Image from "next/image";
import { SchoolContext } from "../../../_components/school-context";

export function EnrollmentsDataTable() {
  const { school } = useContext(SchoolContext);

  const data = useQuery(api.schools.getEnrollments, {
    schoolId: school._id,
  });

  if (!data) return <DataTableSkeleton />;

  if (data.length === 0)
    return (
      <div className={cardStyles}>
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-balance text-lg font-semibold md:text-xl">
            No enrollments found
          </span>
          <p className="mb-10 text-balance text-muted-foreground">
            No one has enrolled yet!
          </p>
          <Image
            src="/assets/posts.svg"
            alt="Enrollments"
            width={300}
            height={300}
          />
        </div>
      </div>
    );

  return (
    <DataTable data={data} columns={columns}>
      <EnrollmentsDataTableToolbar />
      <DataTableBody />
      <DataTablePagination />
    </DataTable>
  );
}
