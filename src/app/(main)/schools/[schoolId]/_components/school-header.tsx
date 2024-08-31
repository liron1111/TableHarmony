"use client";

import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
  PageActions,
} from "@/components/page-header";
import { EnrollSchoolSheet } from "./enroll-school-sheet";
import { ExitSchoolDialog } from "./exit-school-dialog";
import { useSchool } from "./school-context";

export function SchoolHeader() {
  const { school, membership } = useSchool();

  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>{school.name}</PageHeaderHeading>
        <PageHeaderDescription>{school.description}</PageHeaderDescription>
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
