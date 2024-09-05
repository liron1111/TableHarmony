"use client";

import {
  DataTable,
  DataTableBody,
  DataTablePagination,
} from "@/components/data-table";

import { ClassroomMembersDataTableToolbar } from "./toolbar";
import { columns } from "./columns";

import { cardStyles } from "@/styles/common";
import Image from "next/image";
import { useParams } from "next/navigation";

import { useQuery } from "convex/react";
import { api } from "../../../../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../../../../convex/_generated/dataModel";

export function ClassroomMembersDataTable() {
  const { classroomId } = useParams();

  const data = useQuery(api.classrooms.getClassroomMemberships, {
    classroomId: classroomId as Id<"classrooms">,
  });

  if (!data) return <></>;

  if (data.length === 0)
    return (
      <div className={cardStyles}>
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-balance text-lg font-semibold md:text-xl">
            No members found in this classroom
          </span>
          <p className="text-balance text-muted-foreground">
            Invite students to join your classroom and enhance the learning
            experience.
          </p>
        </div>
        <Image
          src="/assets/educator.svg"
          alt="Classroom Members"
          width={300}
          height={300}
        />
      </div>
    );

  return (
    <DataTable data={data} columns={columns}>
      <ClassroomMembersDataTableToolbar />
      <DataTableBody />
      <DataTablePagination />
    </DataTable>
  );
}
