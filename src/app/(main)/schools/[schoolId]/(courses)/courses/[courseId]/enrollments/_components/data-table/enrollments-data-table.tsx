"use client";

import { useCourse } from "@/app/(main)/schools/[schoolId]/(courses)/courses/_components/providers/course-provider";

import { api } from "../../../../../../../../../../../convex/_generated/api";
import { useQuery } from "convex/react";

import {
  DataTable,
  DataTableBody,
  DataTablePagination,
} from "@/components/data-table";

import { columns } from "./columns";
import { cardStyles } from "@/styles/common";
import Image from "next/image";
import { EnrollmentsDataTableToolbar } from "./toolbar";

export function EnrollmentsDataTable() {
  const { course } = useCourse();

  const data = useQuery(api.courses.getEnrollments, {
    courseId: course?._id!,
  });

  if (!data) return <></>;

  if (data.length === 0)
    return (
      <div className={cardStyles}>
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-balance text-lg font-semibold md:text-xl">
            You don&apos;t have any enrollments
          </span>
          <p className="text-balance text-muted-foreground">
            Start promoting your course to attract students and watch your
            community grow.
          </p>
        </div>
        <Image
          src="/assets/selecting-teams.svg"
          alt="Enrollments"
          width="250"
          height="250"
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
