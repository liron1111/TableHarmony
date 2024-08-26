"use client";

import { useContext } from "react";

import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
  PageActions,
} from "@/components/page-header";
import { SchoolContext } from "./school-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EnrollSchoolSheet } from "./enroll-school-sheet";
import { ExitSchoolDialog } from "./exit-school-dialog";

export function SchoolHeader() {
  const { school, role } = useContext(SchoolContext);

  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>{school.name}</PageHeaderHeading>
        <PageHeaderDescription>{school.description}</PageHeaderDescription>
        <PageActions>
          {role === "manager" && (
            <>
              <Button asChild>
                <Link href={`/schools/${school._id}/school-settings`}>
                  School settings
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/schools/${school._id}/enrollments`}>
                  Enrollments
                </Link>
              </Button>
            </>
          )}

          {role === "guest" && <EnrollSchoolSheet />}
          {(role === "teacher" || role === "student") && <ExitSchoolDialog />}
        </PageActions>
      </PageHeader>
    </div>
  );
}
