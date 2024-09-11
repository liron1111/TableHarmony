"use client";

import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMember } from "./member-provider";
import { useMembership } from "../../../../_components/providers/membership-provider";
import { ExitSchoolDialog } from "../../../_components/exit-school-dialog";
import { Button } from "@/components/ui/button";
import { DeleteMembershipsDialog } from "../../../memberships/_components/data-table/delete-memberships-dialog";
import { Id } from "../../../../../../../../../convex/_generated/dataModel";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MemberHeader() {
  const { member } = useMember();

  return (
    <div className="w-full border-b border-border">
      <div className="container">
        <PageHeader>
          <div className="flex gap-4">
            <Avatar className="md:size-16">
              <AvatarImage src={member?.image} alt="Course Image" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div>
              <PageHeaderHeading>{member?.name}</PageHeaderHeading>
              <PageHeaderDescription>{member?.email}</PageHeaderDescription>
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
  const { member, membership: memberMembership } = useMember();

  if (membership?.userId === member?._id) return <ExitSchoolDialog />;

  if (membership?.role !== "manager") return null;

  return (
    <DeleteMembershipsDialog
      membershipIds={[memberMembership?._id as Id<"schoolMemberships">]}
    >
      <Button variant="destructive">Delete member</Button>
    </DeleteMembershipsDialog>
  );
}

function TabsSection() {
  const { memberId, schoolId } = useParams();

  const path = usePathname();
  const currentTab = path.split("/").pop();

  const calculatePath = (tab: string) => {
    return `/schools/${schoolId}/members/${memberId}/${tab}`;
  };

  return (
    <Tabs value={currentTab} defaultValue={currentTab}>
      <TabsList className="space-x-2">
        <TabsTrigger value={memberId as string} asChild>
          <Link href={calculatePath("/")}>Info</Link>
        </TabsTrigger>
        <TabsTrigger value="courses" asChild>
          <Link href={calculatePath("/courses")}>Courses</Link>
        </TabsTrigger>
        <TabsTrigger value="schedule" asChild>
          <Link href={calculatePath("/schedule")}>Schedule</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
