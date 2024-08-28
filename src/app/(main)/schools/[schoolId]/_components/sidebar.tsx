"use client";

import { Button } from "@/components/ui/button";

import { useContext, useState } from "react";
import { SchoolContext } from "./school-context";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ClipboardListIcon,
  EllipsisVertical,
  HomeIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const { school, role } = useContext(SchoolContext);
  const path = usePathname();

  return (
    <aside className="relative left-0 z-10 hidden h-[calc(100vh-69px)] w-60 flex-col border-r border-border md:flex">
      <nav className="flex h-full flex-col items-start space-y-2 px-4 py-5">
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link href={`/schools/${school._id}`}>
            <HomeIcon className="mr-2 h-5 w-5" />
            Home
          </Link>
        </Button>
        {role === "manager" && (
          <>
            <Button
              asChild
              variant="ghost"
              className={cn("w-full justify-start", {
                "bg-muted": path.includes("/enrollments"),
              })}
            >
              <Link href={`/schools/${school._id}/enrollments`}>
                <ClipboardListIcon className="mr-2 h-5 w-5" />
                Enrollments
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={cn("w-full justify-start", {
                "bg-muted": path.includes("/memberships"),
              })}
            >
              <Link href={`/schools/${school._id}/memberships`}>
                <UsersIcon className="mr-2 h-5 w-5" />
                Memberships
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={cn("w-full justify-start", {
                "bg-muted": path.includes("/school-settings"),
              })}
            >
              <Link href={`/schools/${school._id}/school-settings`}>
                <SettingsIcon className="mr-2 h-5 w-5" />
                Settings
              </Link>
            </Button>
          </>
        )}
      </nav>
    </aside>
  );
}

export function SchoolSidebarMobile() {
  const { school, role } = useContext(SchoolContext);

  const path = usePathname();
  const [showSheet, setShowSheet] = useState(false);

  return (
    <Sheet open={showSheet} onOpenChange={setShowSheet}>
      <SheetTrigger>
        <Button size="icon" variant="ghost" aria-label="Open sidebar">
          <EllipsisVertical className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="truncate">{school.name}</SheetTitle>
          <SheetDescription className="truncate">
            {school.description}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-10 space-y-1">
          <span className="text-sm font-semibold uppercase text-muted-foreground">
            overview
          </span>
          {role === "manager" && (
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
                  href={`/schools/${school._id}/enrollments`}
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
                  href={`/schools/${school._id}/memberships`}
                  className="flex items-center gap-2"
                >
                  <UsersIcon className="size-4" />
                  Memberships
                </Link>
              </Button>
            </>
          )}
        </div>
        {role === "manager" && (
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
                href={`/schools/${school._id}/school-settings`}
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
