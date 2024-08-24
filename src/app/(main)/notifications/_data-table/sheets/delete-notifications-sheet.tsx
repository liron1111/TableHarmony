"use client";

import { Dispatch, SetStateAction, useState } from "react";

import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { LoaderButton } from "@/components/loader-button";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TrashIcon } from "lucide-react";

function DeleteNotificationsForm({
  notificationsIds,
  setShowSheet,
}: {
  notificationsIds: Id<"notifications">[];
  setShowSheet: Dispatch<SetStateAction<boolean>>;
}) {
  const deleteNotifications = useMutation(
    api.notifications.deleteNotifications
  );
  const [isPending, setIsPending] = useState(false);

  async function onSubmit() {
    setIsPending(true);

    try {
      await deleteNotifications({ notificationsIds });
      toast.success("Deleted notifications successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }

    setIsPending(false);
    setShowSheet(false);
  }

  return (
    <div className="mt-4 flex w-full gap-2">
      <Button
        variant="outline"
        className="w-full"
        onClick={() => setShowSheet(false)}
      >
        Cancel
      </Button>
      <LoaderButton
        isLoading={isPending}
        className="w-full"
        variant="destructive"
        onClick={onSubmit}
      >
        Delete
      </LoaderButton>
    </div>
  );
}

export function DeleteNotificationsSheet({
  notificationsIds,
}: {
  notificationsIds: string[];
}) {
  const [showSheet, setShowSheet] = useState(false);

  return (
    <Sheet open={showSheet} onOpenChange={setShowSheet}>
      <SheetTrigger>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="destructive" size="icon" aria-label="delete">
              <TrashIcon className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-destructive text-destructive-foreground">
            Delete notifications
          </TooltipContent>
        </Tooltip>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Delete Notifications</SheetTitle>
          <SheetDescription>
            These notificatiosn will immediately be deleted. Once deleted,
            you&apos;ll no longer be able to view or modify it.
          </SheetDescription>
        </SheetHeader>
        <DeleteNotificationsForm
          notificationsIds={notificationsIds as Id<"notifications">[]}
          setShowSheet={setShowSheet}
        />
      </SheetContent>
    </Sheet>
  );
}
