"use client";

import { useState } from "react";

import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";

import { toast } from "sonner";
import { LoaderButton } from "@/components/loader-button";
import { ArchiveIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function UpdateNotificationsButton({
  notificationsIds,
}: {
  notificationsIds: Id<"notifications">[];
}) {
  const [isPending, setIsPending] = useState(false);
  const updateNotifications = useMutation(
    api.notifications.updateNotifications
  );

  async function onSubmit() {
    setIsPending(true);

    try {
      await updateNotifications({ notificationsIds, isRead: true });
      toast.success("Updated notifications successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }

    setIsPending(false);
  }

  return (
    <div>
      <Tooltip>
        <TooltipTrigger>
          <LoaderButton
            isLoading={isPending}
            variant="ghost"
            size="icon"
            onClick={onSubmit}
            icon={<ArchiveIcon className="size-4" />}
          >
            <span className="sr-only"></span>
          </LoaderButton>
        </TooltipTrigger>
        <TooltipContent>Mark as read</TooltipContent>
      </Tooltip>
    </div>
  );
}
