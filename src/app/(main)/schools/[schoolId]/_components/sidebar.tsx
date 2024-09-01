"use client";

import { Button } from "@/components/ui/button";

import { useState } from "react";
import { useSchool } from "./providers/school-provider";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ClipboardListIcon, SettingsIcon, UsersIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import useMediaQuery from "@/hooks/use-media-query";
import { useMembership } from "./providers/membership-provider";

export function Sidebar() {
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

export function SchoolSidebarMobile() {
  const { school } = useSchool();
  const { membership } = useMembership();

  const path = usePathname();
  const [showSheet, setShowSheet] = useState(false);

  return (
    <Sheet open={showSheet} onOpenChange={setShowSheet}>
      <SheetTrigger>
        <Button size="icon" variant="ghost" aria-label="Open sidebar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-chart-no-axes-gantt size-5"
          >
            <path d="M8 6h10" />
            <path d="M6 12h9" />
            <path d="M11 18h7" />
          </svg>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="truncate">{school?.name}</SheetTitle>
          <SheetDescription className="truncate">
            {school?.description}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-10 space-y-1">
          <span className="text-sm font-semibold uppercase text-muted-foreground">
            overview
          </span>
          {membership?.role === "manager" && (
            <>
              <Button
                variant="ghost"
                className={cn("flex w-full justify-start", {
                  "bg-muted": path.includes("enrollments"),
                })}
                onClick={() => setShowSheet(false)}
                asChild
              >
                <Link
                  href={`/schools/${school?._id}/enrollments`}
                  className="flex items-center gap-2"
                >
                  <ClipboardListIcon className="size-4" />
                  Enrollments
                </Link>
              </Button>
              <Button
                variant="ghost"
                className={cn("flex w-full justify-start", {
                  "bg-muted": path.includes("memberships"),
                })}
                onClick={() => setShowSheet(false)}
                asChild
              >
                <Link
                  href={`/schools/${school?._id}/memberships`}
                  className="flex items-center gap-2"
                >
                  <UsersIcon className="size-4" />
                  Memberships
                </Link>
              </Button>
            </>
          )}
        </div>
        {membership?.role === "manager" && (
          <div className="mt-10 space-y-1">
            <span className="text-sm font-semibold uppercase text-muted-foreground">
              manage
            </span>
            <Button
              variant="ghost"
              className={cn("flex w-full justify-start", {
                "bg-muted": path.includes("school-settings"),
              })}
              onClick={() => setShowSheet(false)}
              asChild
            >
              <Link
                href={`/schools/${school?._id}/school-settings`}
                className="flex items-center gap-2"
              >
                <SettingsIcon className="size-4" />
                School settings
              </Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
