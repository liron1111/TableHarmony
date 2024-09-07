"use client";

import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTeacher } from "./teacher-provider";
import { useMembership } from "../../../../_components/providers/membership-provider";
import { ExitSchoolDialog } from "../../../_components/exit-school-dialog";
import { Button } from "@/components/ui/button";
import { DeleteMembershipsSheet } from "../../../memberships/_components/data-table/delete-memberships-sheet";
import { Id } from "../../../../../../../../../convex/_generated/dataModel";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function TeacherHeader() {
  const { teacher } = useTeacher();

  return (
    <div className="w-full border-b border-border">
      <div className="container">
        <PageHeader>
          <div className="flex gap-4">
            <Avatar className="md:size-16">
              <AvatarImage src={teacher?.image} alt="Course Image" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div>
              <PageHeaderHeading>{teacher?.name}</PageHeaderHeading>
              <PageHeaderDescription>{teacher?.email}</PageHeaderDescription>
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
  const { teacher, membership: teacherMembership } = useTeacher();

  if (membership?.userId === teacher?._id) return <ExitSchoolDialog />;

  if (membership?.role !== "manager") return null;

  return (
    <DeleteMembershipsSheet
      membershipIds={[teacherMembership?._id as Id<"schoolMemberships">]}
    >
      <Button variant="destructive">Delete teacher</Button>
    </DeleteMembershipsSheet>
  );
}

function TabsSection() {
  const { teacherId, schoolId } = useParams();

  const path = usePathname();
  const currentTab = path.split("/").pop();

  const calculatePath = (tab: string) => {
    return `/schools/${schoolId}/teachers/${teacherId}/${tab}`;
  };

  return (
    <Tabs value={currentTab} defaultValue={currentTab}>
      <TabsList className="space-x-2">
        <TabsTrigger value={teacherId as string} asChild>
          <Link href={calculatePath("/")}>Info</Link>
        </TabsTrigger>
        <TabsTrigger value="courses" asChild>
          <Link href={calculatePath("courses")}>Courses</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
