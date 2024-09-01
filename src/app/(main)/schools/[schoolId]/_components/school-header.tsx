"use client";

import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
  PageActions,
} from "@/components/page-header";
import { EnrollSchoolSheet } from "./enroll-school-sheet";
import { ExitSchoolDialog } from "./exit-school-dialog";
import { useSchool } from "./providers/school-provider";
import { useMembership } from "./providers/membership-provider";

export function SchoolHeader() {
  const { school } = useSchool();
  const { membership } = useMembership();

  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>{school?.name}</PageHeaderHeading>
        <PageHeaderDescription>{school?.description}</PageHeaderDescription>
        {!membership && (
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
