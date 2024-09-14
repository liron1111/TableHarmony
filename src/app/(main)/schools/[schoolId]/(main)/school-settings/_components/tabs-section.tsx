"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SettingsTabs() {
  const { schoolId } = useParams();

  const path = usePathname();
  const currentTab = path.split("/").pop();

  return (
    <Tabs value={currentTab} defaultValue={currentTab}>
      <TabsList className="space-x-4">
        <TabsTrigger value="school-settings" asChild>
          <Link href={`/schools/${schoolId}/school-settings`}>general</Link>
        </TabsTrigger>
        <TabsTrigger value="danger" asChild>
          <Link href={`/schools/${schoolId}/school-settings/danger`}>
            danger
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
