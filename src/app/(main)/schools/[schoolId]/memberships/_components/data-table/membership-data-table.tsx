"use client";

import { api } from "../../../../../../../../convex/_generated/api";
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
import { useSchool } from "../../../_components/providers/school-provider";

export function MembershipDataTable() {
  const { school } = useSchool();

  const data = useQuery(api.schools.getSchoolMemberships, {
    schoolId: school?._id!,
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
          width={300}
          height={300}
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
