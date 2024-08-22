"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SettingsTabs({ schoolId }: { schoolId: string }) {
  const path = usePathname();
  const currentTab = path.split("/").pop();

  return (
    <Tabs value={currentTab} defaultValue={currentTab}>
      <TabsList className="space-x-4">
        <TabsTrigger value="school-settings" asChild>
          <Link href={`/schools/${schoolId}/school-settings`}>General</Link>
        </TabsTrigger>
        <TabsTrigger value="danger" asChild>
          <Link href={`/schools/${schoolId}/school-settings/danger`}>
            Danger
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
