"use client";

import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

import { useCourse } from "../../_components/providers/course-provider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useMembership } from "../../../../_components/providers/membership-provider";
import { EnrollCourseDialog } from "./enroll-course-dialog";
import { LeaveCourseDialog } from "./leave-course-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ClipboardIcon,
  LogInIcon,
  LogOutIcon,
  SettingsIcon,
  TrashIcon,
  UsersIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function CourseHeader() {
  const { course } = useCourse();

  return (
    <div className="w-full border-b border-border">
      <div className="container">
        <PageHeader>
          <div className="flex gap-4">
            <Avatar className="md:size-16">
              <AvatarImage src={course?.image} alt="Course Image" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div>
              <PageHeaderHeading>{course?.name}</PageHeaderHeading>
              <PageHeaderDescription>
                {course?.description}
              </PageHeaderDescription>
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

function TabsSection() {
  const { schoolId, courseId } = useParams();
  const { membership } = useCourse();
  const { membership: schoolMembership } = useMembership();

  const path = usePathname();
  const currentTab = path.split("/").pop();

  const hasAccess = schoolMembership?.role === "manager" || membership !== null;

  const calculatePath = (tab: string) => {
    return `/schools/${schoolId}/courses/${courseId}/${tab}`;
  };

  return (
    <Tabs value={currentTab} defaultValue={currentTab}>
      <TabsList className="space-x-2">
        <TabsTrigger value={courseId as string} asChild>
          <Link href={calculatePath("/")}>Info</Link>
        </TabsTrigger>
        {hasAccess && (
          <>
            <TabsTrigger value={"classes"} asChild>
              <Link href={calculatePath("/classes")}>Classes</Link>
            </TabsTrigger>
            <TabsTrigger value={"assignments"} asChild>
              <Link href={calculatePath("/assignments")}>Assignments</Link>
            </TabsTrigger>
          </>
        )}
      </TabsList>
    </Tabs>
  );
}

function MembershipButtons() {
  const { membership: schoolMembership } = useMembership();
  const { membership } = useCourse();

  const { courseId, schoolId } = useParams();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname.endsWith(path);
  };

  const calculatePath = (path: string) => {
    return `/schools/${schoolId}/courses/${courseId}/${path}`;
  };

  const isManager =
    membership?.role === "manager" || schoolMembership?.role === "manager";
  const isGuest = membership === null;

  if (isGuest && !isManager) {
    return (
      <EnrollCourseDialog>
        <Button>
          <LogInIcon className="mr-2 size-4" />
          Enroll
        </Button>
      </EnrollCourseDialog>
    );
  }

  if (!isGuest && !isManager) {
    return (
      <LeaveCourseDialog>
        <Button variant="destructive">
          <LogOutIcon className="mr-2 size-4" />
          Leave
        </Button>
      </LeaveCourseDialog>
    );
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button>Manage</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="space-y-1">
          <DropdownMenuItem asChild>
            <Link
              href={calculatePath("enrollments")}
              className={cn("cursor-pointer", {
                "bg-accent": isActive("enrollments"),
              })}
            >
              <ClipboardIcon className="mr-2 size-4" />
              Enrolls
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={calculatePath("memberships")}
              className={cn("cursor-pointer", {
                "bg-accent": isActive("memberships"),
              })}
            >
              <UsersIcon className="mr-2 size-4" />
              Members
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              href={calculatePath("course-settings")}
              className={cn("cursor-pointer", {
                "bg-accent": isActive("course-settings"),
              })}
            >
              <SettingsIcon className="mr-2 size-4" />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(
              "cursor-pointer text-destructive hover:!text-destructive",
              {
                "bg-accent": isActive("danger"),
              }
            )}
            asChild
          >
            <Link href={calculatePath("course-settings/danger")}>
              <TrashIcon className="mr-2 size-4" />
              Danger
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
