"use client";

import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useStudent } from "./student-provider";
import { useMembership } from "../../../../_components/providers/membership-provider";
import { ExitSchoolDialog } from "../../../_components/exit-school-dialog";
import { Button } from "@/components/ui/button";
import { DeleteMembershipsSheet } from "../../../memberships/_components/data-table/delete-memberships-sheet";
import { Id } from "../../../../../../../../../convex/_generated/dataModel";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function StudentHeader() {
  const { student } = useStudent();

  return (
    <div className="w-full border-b border-border">
      <div className="container">
        <PageHeader>
          <div className="flex gap-4">
            <Avatar className="md:size-16">
              <AvatarImage src={student?.image} alt="Course Image" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div>
              <PageHeaderHeading>{student?.name}</PageHeaderHeading>
              <PageHeaderDescription>{student?.email}</PageHeaderDescription>
            </div>
          </div>
          <PageActions className="flex w-full justify-between">
            <TabsSection />
            <MembershipButtons />
          </PageActions>
        </PageHeader>
      </div>
    </div>
  );
}

function MembershipButtons() {
  const { membership } = useMembership();
  const { student, membership: studentMembership } = useStudent();

  if (membership?.userId === student?._id) return <ExitSchoolDialog />;

  if (membership?.role !== "manager") return null;

  return (
    <DeleteMembershipsSheet
      membershipIds={[studentMembership?._id as Id<"schoolMemberships">]}
    >
      <Button variant="destructive">Delete student</Button>
    </DeleteMembershipsSheet>
  );
}

function TabsSection() {
  const { studentId, schoolId } = useParams();

  const path = usePathname();
  const currentTab = path.split("/").pop();

  const calculatePath = (tab: string) => {
    return `/schools/${schoolId}/students/${studentId}/${tab}`;
  };

  return (
    <Tabs value={currentTab} defaultValue={currentTab}>
      <TabsList className="space-x-2">
        <TabsTrigger value={studentId as string} asChild>
          <Link href={calculatePath("/")}>Info</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
