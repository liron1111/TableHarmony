"use client";

import { useContext } from "react";

import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
  PageActions,
} from "@/components/page-header";
import { SchoolContext } from "./school-context";
import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EnrollButton } from "./enroll-button";

export function SchoolHeader() {
  const { school } = useContext(SchoolContext);
  const user = useQuery(api.users.getCurrentUser);

  const isCreator = user?._id === school.creatorId;

  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>{school.name}</PageHeaderHeading>
        <PageHeaderDescription>{school.description}</PageHeaderDescription>
        <PageActions>
          {isCreator ? (
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
          ) : (
            <EnrollButton />
          )}
        </PageActions>
      </PageHeader>
    </div>
  );
}
