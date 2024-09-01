"use client";

import {
  PageHeader,
  PageHeaderHeading,
  PageActions,
  PageHeaderDescription,
} from "@/components/page-header";
import { EnrollSchoolSheet } from "./enroll-school-sheet";
import { ExitSchoolDialog } from "./exit-school-dialog";
import { useMembership } from "./providers/membership-provider";

export function SchoolHeader() {
  const { membership } = useMembership();

  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>Overview</PageHeaderHeading>
        <PageHeaderDescription>
          General info about this school
        </PageHeaderDescription>
        {membership === null && (
          <PageActions>
            <EnrollSchoolSheet />
          </PageActions>
        )}
        {(membership?.role === "teacher" || membership?.role === "student") && (
          <PageActions>
            <ExitSchoolDialog />
          </PageActions>
        )}
      </PageHeader>
    </div>
  );
}
