"use client";

import { useParams } from "next/navigation";

import { SchoolSidebar } from "@/app/(main)/schools/[schoolId]/(main)/_components/sidebar";
import { Button } from "@/components/ui/button";
import { HomeIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";
import useMediaQuery from "@/hooks/use-media-query";

export function Sidebar() {
  const { classroomId } = useParams();
  const { isMobile } = useMediaQuery();

  if (isMobile) return <></>;

  if (!classroomId) return <SchoolSidebar />;

  return (
    <div className="flex -space-x-4">
      <SchoolSidebar />
      <ClassroomSidebar />
    </div>
  );
}

export function ClassroomSidebar() {
  const { classroomId, schoolId } = useParams();

  return (
    <div className="h-[calc(100vh-65px)]">
      <div className="h-full border-r border-border p-4">
        <div className="flex flex-col">
          <Button
            variant="ghost"
            className="flex items-center justify-start gap-2"
            asChild
          >
            <Link href={`/schools/${schoolId}/classrooms/${classroomId}`}>
              <HomeIcon className="size-4" />
              Classroom
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="flex items-center justify-start gap-2"
            asChild
          >
            <Link
              href={`/schools/${schoolId}/classrooms/${classroomId}/settings`}
            >
              <SettingsIcon className="size-4" />
              Classroom settings
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
