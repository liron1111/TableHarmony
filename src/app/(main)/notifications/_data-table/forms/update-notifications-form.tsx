"use client";

import { useState } from "react";

import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";

import { toast } from "sonner";
import { LoaderButton } from "@/components/loader-button";
import { MailIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger>
            <LoaderButton
              isLoading={isPending}
              className="w-full"
              variant="outline"
              size="icon"
              onClick={onSubmit}
              icon={<MailIcon className="size-4" />}
            >
              <span className="sr-only"></span>
            </LoaderButton>
          </TooltipTrigger>
          <TooltipContent>Mark as read</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
