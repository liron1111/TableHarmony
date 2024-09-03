"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSchool } from "@/app/(main)/schools/[schoolId]/_components/providers/school-provider";

export function SettingsTabs() {
  const { school } = useSchool();

  const path = usePathname();
  const currentTab = path.split("/").pop();

  return (
    <Tabs value={currentTab} defaultValue={currentTab}>
      <TabsList className="space-x-4">
        <TabsTrigger value="school-settings" asChild>
          <Link href={`/schools/${school?._id}/school-settings`}>General</Link>
        </TabsTrigger>
        <TabsTrigger value="danger" asChild>
          <Link href={`/schools/${school?._id}/school-settings/danger`}>
            Danger
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
