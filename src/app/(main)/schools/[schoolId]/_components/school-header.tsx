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
      </PageHeader>
    </div>
  );
}
