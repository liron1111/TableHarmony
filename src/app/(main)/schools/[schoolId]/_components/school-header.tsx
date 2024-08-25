"use client";

import { useContext } from "react";

import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
} from "@/components/page-header";
import { SchoolContext } from "./school-context";

export function SchoolHeader() {
  const { school } = useContext(SchoolContext);

  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>{school.name}</PageHeaderHeading>
        <PageHeaderDescription>{school.description}</PageHeaderDescription>
      </PageHeader>
    </div>
  );
}
