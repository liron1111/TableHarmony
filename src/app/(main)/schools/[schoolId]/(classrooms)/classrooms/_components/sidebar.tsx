"use client";

import Link from "next/link";

import { useParams } from "next/navigation";
import useMediaQuery from "@/hooks/use-media-query";
import { useMembership } from "@/app/(main)/schools/[schoolId]/_components/providers/membership-provider";

import { SchoolSidebar } from "@/app/(main)/schools/[schoolId]/(main)/_components/sidebar";

import { Button } from "@/components/ui/button";
import { HomeIcon, SettingsIcon } from "lucide-react";

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
  const { membership } = useMembership();

  return (
    <div className="h-[calc(100vh-65px)] w-[200px]">
      <div className="h-full border-r border-border bg-muted/20 p-4">
        <div className="flex flex-col space-y-2">
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
          {membership?.role === "manager" && (
            <Button
              variant="ghost"
              className="flex items-center justify-start gap-2"
              asChild
            >
              <Link
                href={`/schools/${schoolId}/classrooms/${classroomId}/classroom-settings`}
              >
                <SettingsIcon className="size-4" />
                Settings
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
