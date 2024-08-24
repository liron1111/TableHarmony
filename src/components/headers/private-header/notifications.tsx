"use client";

import { useState } from "react";

import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BellIcon, EyeIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { LoaderButton } from "@/components/loader-button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Notifications() {
  const [isOpen, setIsOpen] = useState(false);

  const notifications = useQuery(api.notifications.getUnReadNotifications, {
    limit: 3,
  });

  if (!notifications)
    return (
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        aria-label="notifications"
      >
        <BellIcon className="size-4" />
      </Button>
    );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="notifications"
            >
              <BellIcon className="size-4" />
              {notifications.length > 0 && (
                <span className="absolute right-[1px] top-1 size-2 rounded-full bg-blue-500" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Notifications</TooltipContent>
        </Tooltip>
      </PopoverTrigger>
      <PopoverContent
        className="m-2 grid max-w-sm space-y-4 md:m-0 md:w-96"
        align="end"
      >
        <div className="flex items-center justify-between text-sm font-semibold">
          Notifications
          <Link
            href="/notifications"
            onClick={() => setIsOpen(false)}
            className="text-xs text-primary"
          >
            View all
          </Link>
        </div>
        <Separator />
        <div className="grid space-y-1 text-sm text-muted-foreground">
          {notifications.length === 0 && (
            <div className="m-1 flex items-center justify-center text-xs">
              No unread notifications
            </div>
          )}
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className="flex items-center justify-between rounded-md border p-1 px-2"
            >
              <span className="w-36 truncate">{notification.title}</span>
              <Toolbar notificationId={notification._id} />
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function Toolbar({ notificationId }: { notificationId: Id<"notifications"> }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const deleteNotification = useMutation(api.notifications.deleteNotification);
  const updateNotification = useMutation(api.notifications.updateNotification);

  const onDelete = async () => {
    setIsDeleting(true);
    await deleteNotification({ notificationId });
    setIsDeleting(false);
  };

  const onUpdate = async () => {
    setIsUpdating(true);
    await updateNotification({ notificationId, isRead: true });
    setIsUpdating(false);
  };

  return (
    <div className="flex items-center gap-0.5">
      <LoaderButton
        isLoading={isUpdating}
        size="icon"
        icon={<EyeIcon className="size-4" />}
        variant="ghost"
        onClick={onUpdate}
      >
        <span className="sr-only">Update</span>
      </LoaderButton>
      <LoaderButton
        isLoading={isDeleting}
        size="icon"
        icon={<TrashIcon className="size-4" />}
        variant="ghost"
        onClick={onDelete}
      >
        <span className="sr-only">Delete</span>
      </LoaderButton>
    </div>
  );
}
