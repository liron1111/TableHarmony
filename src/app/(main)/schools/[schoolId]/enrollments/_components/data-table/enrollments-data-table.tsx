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

  if (!data) return <></>; //TODO: skeleton ?

  if (data.length === 0)
    return (
      <div className={cardStyles}>
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-balance text-lg font-semibold md:text-xl">
            You don&apos;t have any enrollments
          </span>
          <p className="text-balance text-muted-foreground">
            Start promoting your school to attract studnts and watch your
            community grow.
          </p>
        </div>
        <Image
          src="/assets/selecting-teams.svg"
          alt="Enrollments"
          width={300}
          height={300}
        />
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
