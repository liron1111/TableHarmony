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
import { MembershipsDataTableToolbar } from "./toolbar";

export function MembershipDataTable() {
  const { course } = useCourse();

  const data = useQuery(api.courses.getCourseMemberships, {
    courseId: course?._id!,
  });

  if (!data) return <></>;

  if (data.length === 0)
    return (
      <div className={cardStyles}>
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-balance text-lg font-semibold md:text-xl">
            You don&apos;t have any members
          </span>
          <p className="text-balance text-muted-foreground">
            Start promoting your school to attract studnts and watch your
            community grow.
          </p>
        </div>
        <Image
          src="/assets/selecting-teams.svg"
          alt="Members"
          width="250"
          height="250"
        />
      </div>
    );

  return (
    <DataTable data={data} columns={columns}>
      <MembershipsDataTableToolbar />
      <DataTableBody />
      <DataTablePagination />
    </DataTable>
  );
}
