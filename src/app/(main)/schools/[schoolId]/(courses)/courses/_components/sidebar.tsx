"use client";

import Link from "next/link";

import { useParams, usePathname } from "next/navigation";
import useMediaQuery from "@/hooks/use-media-query";
import { CourseProvider, useCourse } from "./providers/course-provider";

import { SchoolSidebar } from "@/app/(main)/schools/[schoolId]/(main)/_components/sidebar";

import { HomeIcon, SettingsIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const { courseId } = useParams();
  const { isMobile } = useMediaQuery();

  if (isMobile) return <></>;

  if (!courseId) return <SchoolSidebar />;

  return (
    <CourseProvider>
      <div className="flex -space-x-4">
        <SchoolSidebar />
        <CourseSidebar />
      </div>
    </CourseProvider>
  );
}

export function CourseSidebar() {
  const { courseId, schoolId } = useParams();
  const pathname = usePathname();

  const { membership } = useCourse();

  const calculatePathname = (path: string) => {
    return `/schools/${schoolId}/courses/${courseId}${path}`;
  };

  return (
    <div className="h-[calc(100vh-65px)] w-[200px]">
      <div className="h-full border-r border-border bg-muted/20 p-4">
        <div className="flex flex-col space-y-2">
          <Link
            href={calculatePathname("/")}
            className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground transition-all hover:text-inherit"
          >
            <HomeIcon className="size-4" />
            Course
          </Link>
          {membership?.role === "manager" && (
            <Link
              href={calculatePathname("/course-settings")}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground transition-all hover:text-foreground",
                pathname.includes("/course-settings") && "text-foreground"
              )}
            >
              <SettingsIcon className="size-4" />
              Settings
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
