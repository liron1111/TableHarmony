"use client";

import { useConvexAuth } from "convex/react";

import useMediaQuery from "@/hooks/use-media-query";

import { ModeToggle } from "@/components/mode-toggle";
import { Notifications } from "./notifications";
import { MenuButton } from "./menu-button";
import { SendFeedbackSheet } from "./send-feedback-sheet";
import { Skeleton } from "@/components/ui/skeleton";

export function HeaderActions() {
  const { isLoading } = useConvexAuth();
  const { isMobile } = useMediaQuery();

  if (isLoading) return <Skeleton className="h-6 w-28 md:w-36" />;

  return (
    <div className="flex items-center gap-0.5">
      <SendFeedbackSheet />
      <Notifications />
      {!isMobile && <ModeToggle variant="button" />}
      <div className="flex items-center md:ml-2">
        <MenuButton />
      </div>
    </div>
  );
}
