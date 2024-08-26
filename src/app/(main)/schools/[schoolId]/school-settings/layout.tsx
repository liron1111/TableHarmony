"use client";

import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { SettingsTabs } from "./_components/tabs-section";

import { AssertSchoolOwner } from "./_components/middleware";

export default function SettingsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { schoolId: string };
}) {
  const { school } = AssertSchoolOwner();

  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>School settings</PageHeaderHeading>
        <PageHeaderDescription>
          Manage your school&apos;s settings and set preferences.
        </PageHeaderDescription>
        <PageActions>
          <SettingsTabs schoolId={school?._id} />
        </PageActions>
      </PageHeader>
      {children}
    </div>
  );
}
