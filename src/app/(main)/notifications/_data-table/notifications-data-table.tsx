"use client";

import { api } from "../../../../../convex/_generated/api";
import { useQuery } from "convex/react";

import {
  DataTable,
  DataTableBody,
  DataTablePagination,
  DataTableSkeleton,
} from "@/components/data-table";

import { columns } from "./columns";
import { NotificationsDataTableToolbar } from "./toolbar";

export function NotificationsDataTable() {
  const data = useQuery(api.notifications.getUserNotifications, {});

  if (!data) return <DataTableSkeleton />;

  return (
    <DataTable data={data} columns={columns}>
      <NotificationsDataTableToolbar />
      <DataTableBody />
      <DataTablePagination />
    </DataTable>
  );
}
