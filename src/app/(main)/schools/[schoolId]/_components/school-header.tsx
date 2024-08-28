"use client";

import { useContext } from "react";

import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
  PageActions,
} from "@/components/page-header";
import { SchoolContext } from "./school-context";
import { EnrollSchoolSheet } from "./enroll-school-sheet";
import { ExitSchoolDialog } from "./exit-school-dialog";

export function SchoolHeader() {
  const { school, role } = useContext(SchoolContext);

  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>{school.name}</PageHeaderHeading>
        <PageHeaderDescription>{school.description}</PageHeaderDescription>
        {role === "guest" && (
          <PageActions>
            <EnrollSchoolSheet />
          </PageActions>
        )}
        {(role === "teacher" || role === "student") && (
          <PageActions>
            <ExitSchoolDialog />
          </PageActions>
        )}
      </PageHeader>
    </div>
  );
}
