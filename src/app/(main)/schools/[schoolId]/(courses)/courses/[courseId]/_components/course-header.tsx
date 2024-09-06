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

export function CourseHeader() {
  const { course, membership } = useCourse();

  return (
    <div className="w-full border-b border-border">
      <div className="container max-w-full">
        <PageHeader className="px-2 py-4 md:py-6 md:pb-4 lg:py-6 lg:pb-5">
          <PageHeaderHeading>{course?.name}</PageHeaderHeading>
          <PageHeaderDescription>{course?.description}</PageHeaderDescription>
          <PageActions>
            <TabsSection />
          </PageActions>
        </PageHeader>
      </div>
    </div>
  );
}

function TabsSection() {
  const { schoolId, courseId } = useParams();
  const { membership } = useCourse();

  const path = usePathname();
  const currentTab = path.split("/").pop();

  const calculatePath = (tab: string) => {
    return `/schools/${schoolId}/courses/${courseId}/${tab}`;
  };

  return (
    <Tabs value={currentTab} defaultValue={currentTab}>
      <TabsList className="space-x-4">
        <TabsTrigger value={courseId as string} asChild>
          <Link href={calculatePath("/")}>Info</Link>
        </TabsTrigger>
        {membership?.role === "manager" && (
          <>
            <TabsTrigger value="memberships" asChild>
              <Link href={calculatePath("/memberships")}>Members</Link>
            </TabsTrigger>
            <TabsTrigger value="course-settings" asChild>
              <Link href={calculatePath("/course-settings")}>Settings</Link>
            </TabsTrigger>
            <TabsTrigger value="danger" asChild>
              <Link href={calculatePath("/course-settings/danger")}>
                Danger
              </Link>
            </TabsTrigger>
          </>
        )}
      </TabsList>
    </Tabs>
  );
}
