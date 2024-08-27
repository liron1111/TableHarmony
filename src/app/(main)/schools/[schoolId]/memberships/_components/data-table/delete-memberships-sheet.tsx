"use client";

import { Dispatch, SetStateAction, useContext, useState } from "react";

import { api } from "../../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../../convex/_generated/dataModel";
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

function DeleteMembershipsForm({
  membershipIds,
  setShowSheet,
}: {
  membershipIds: Id<"schoolMemberships">[];
  setShowSheet: Dispatch<SetStateAction<boolean>>;
}) {
  const [isPending, setIsPending] = useState(false);
  const deleteMemberships = useMutation(api.schools.deleteMemberships);

  async function onSubmit() {
    setIsPending(true);

    try {
      await deleteMemberships({ membershipIds });
      toast.success("Deleted memberships successfully!");
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

export function DeleteMembershipsSheet({
  membershipIds,
}: {
  membershipIds: string[];
}) {
  const [showSheet, setShowSheet] = useState(false);

  return (
    <Sheet open={showSheet} onOpenChange={setShowSheet}>
      <SheetTrigger>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="ghost" size="icon">
              <TrashIcon className="size-4 text-destructive" />
              <span className="sr-only">Delete</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete memberships</TooltipContent>
        </Tooltip>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Delete Memberships</SheetTitle>
          <SheetDescription>
            These memberships will immediately be deleted. Once deleted,
            you&apos;ll no longer be able to view or modify it.
          </SheetDescription>
        </SheetHeader>

        <DeleteMembershipsForm
          membershipIds={membershipIds as Id<"schoolMemberships">[]}
          setShowSheet={setShowSheet}
        />
      </SheetContent>
    </Sheet>
  );
}
