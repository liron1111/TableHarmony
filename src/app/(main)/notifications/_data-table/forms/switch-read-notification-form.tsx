"use client";

import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";

import { LoaderButton } from "@/components/loader-button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export function SwitchReadNotificationForm({
  notificationId,
  isRead,
}: {
  notificationId: string;
  isRead: boolean;
}) {
  const updateNotification = useMutation(api.notifications.updateNotification);
  const [isPending, setIsPending] = useState(false);

  async function onSubmit() {
    setIsPending(true);

    try {
      await updateNotification({
        notificationId: notificationId as Id<"notifications">,
        isRead: !isRead,
      });
      toast.success("Updated notification successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }

    setIsPending(false);
  }

  return (
    <LoaderButton
      isLoading={isPending}
      icon={
        isRead ? (
          <EyeIcon className="size-4" />
        ) : (
          <EyeOffIcon className="size-4" />
        )
      }
      variant="ghost"
      onClick={() => onSubmit()}
    >
      <span className="sr-only">Switch read</span>
    </LoaderButton>
  );
}
