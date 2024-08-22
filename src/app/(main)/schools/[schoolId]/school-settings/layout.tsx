"use client";

import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/page-header";
import { SettingsTabs } from "./_components/tabs-section";
import { useQuery } from "convex/react";

import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { redirect } from "next/navigation";

export default function SettingsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { schoolId: string };
}) {
  const schoolId = params.schoolId as Id<"schools">;
  const school = useQuery(api.schools.assertSchoolOwner, { schoolId });

  if (!school) return;

  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>School settings</PageHeaderHeading>
        <PageActions>
          <SettingsTabs schoolId={school?._id} />
        </PageActions>
      </PageHeader>
      {children}
    </div>
  );
}
