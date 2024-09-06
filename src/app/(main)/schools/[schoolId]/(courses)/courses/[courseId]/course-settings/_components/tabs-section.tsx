"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SettingsTabs() {
  const { schoolId, courseId } = useParams();

  const path = usePathname();
  const currentTab = path.split("/").pop();

  return (
    <Tabs value={currentTab} defaultValue={currentTab}>
      <TabsList className="space-x-4">
        <TabsTrigger value="course-settings" asChild>
          <Link
            href={`/schools/${schoolId}/courses/${courseId}/course-settings`}
          >
            General
          </Link>
        </TabsTrigger>
        <TabsTrigger value="danger" asChild>
          <Link
            href={`/schools/${schoolId}/courses/${courseId}/course-settings/danger`}
          >
            Danger
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
