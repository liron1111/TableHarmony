"use client";

import { Button } from "@/components/ui/button";

import { useSchool } from "@/app/(main)/schools/[schoolId]/_components/providers/school-provider";
import { useMembership } from "@/app/(main)/schools/[schoolId]/_components/providers/membership-provider";
import useMediaQuery from "@/hooks/use-media-query";

import Link from "next/link";
import { ClipboardListIcon, SettingsIcon, UsersIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function SchoolSidebar() {
  const { school } = useSchool();
  const { membership } = useMembership();
  const path = usePathname();
  const { isMobile } = useMediaQuery();

  if (isMobile) return null;

  return (
    <aside className="fixed z-30 flex h-[calc(100vh-69px)] shrink-0 flex-col bg-card max-md:inset-0 max-md:bg-background/80 max-md:pt-14 max-md:text-[15px] max-md:backdrop-blur-md md:sticky md:top-0 md:w-[240px] md:border-e xl:w-[260px]">
      <div className="flex flex-col gap-8 px-4 py-6 md:px-3">
        <div className="space-y-1">
          <span className="font-medium">Overview</span>
          {membership?.role === "manager" && (
            <>
              <Button
                variant="ghost"
                className={cn("w-full justify-start", {
                  "bg-muted": path.includes("/memberships"),
                })}
                asChild
              >
                <Link href={`/schools/${school?._id}/memberships`}>
                  <UsersIcon className="mr-2 size-5" />
                  Memberships
                </Link>
              </Button>
              <Button
                variant="ghost"
                className={cn("w-full justify-start", {
                  "bg-muted": path.includes("/enrollments"),
                })}
                asChild
              >
                <Link href={`/schools/${school?._id}/enrollments`}>
                  <ClipboardListIcon className="mr-2 size-5" />
                  Enrollments
                </Link>
              </Button>
            </>
          )}
        </div>

        {membership?.role === "manager" && (
          <div className="space-y-1">
            <span className="font-medium">Settings</span>
            <div className="flex flex-row items-center px-4 py-2 md:px-3">
              <Button
                asChild
                variant="ghost"
                className={cn("w-full justify-start", {
                  "bg-muted": path.includes("/school-settings"),
                })}
              >
                <Link href={`/schools/${school?._id}/school-settings`}>
                  <SettingsIcon className="mr-2 size-5" />
                  School settings
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
