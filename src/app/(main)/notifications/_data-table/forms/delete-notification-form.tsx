"use client";

import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";

import { toast } from "sonner";
import { LoaderButton } from "@/components/loader-button";
import { TrashIcon } from "lucide-react";
import { useState } from "react";

export function DeleteNotificationForm({
  notificationId,
}: {
  notificationId: string;
}) {
  const deleteNotification = useMutation(api.notifications.deleteNotification);
  const [isPending, setIsPending] = useState(false);

  async function onSubmit() {
    setIsPending(true);

    try {
      await deleteNotification({
        notificationId: notificationId as Id<"notifications">,
      });
      toast.success("Deleted notification successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }

    setIsPending(false);
  }

  return (
    <LoaderButton
      isLoading={isPending}
      icon={<TrashIcon className="size-4" />}
      variant="ghost"
      onClick={onSubmit}
    >
      <span className="sr-only">Delete</span>
    </LoaderButton>
  );
}
