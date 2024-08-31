"use client";

import { Dispatch, SetStateAction, useState } from "react";

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
import { UserPlusIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function AcceptEnrollmentsForm({
  enrollmentIds,
  setShowSheet,
}: {
  enrollmentIds: Id<"schoolEnrollments">[];
  setShowSheet: Dispatch<SetStateAction<boolean>>;
}) {
  const [isPending, setIsPending] = useState(false);
  const approveEnrollments = useMutation(api.schools.approveEnrollments);

  async function onSubmit() {
    setIsPending(true);

    try {
      await approveEnrollments({ enrollmentIds });
      toast.success("Accpeted enrollments successfully!");
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
      <LoaderButton isLoading={isPending} className="w-full" onClick={onSubmit}>
        Accept
      </LoaderButton>
    </div>
  );
}

export function AcceptEnrollmentsSheet({
  enrollmentIds,
}: {
  enrollmentIds: string[];
}) {
  const [showSheet, setShowSheet] = useState(false);

  return (
    <Sheet open={showSheet} onOpenChange={setShowSheet}>
      <SheetTrigger>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="ghost" size="icon">
              <UserPlusIcon className="size-4" />
              <span className="sr-only">Enrollments</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Accept enrollments</TooltipContent>
        </Tooltip>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Accept Enrollments</SheetTitle>
          <SheetDescription>
            Accept these enrollments to your school.
          </SheetDescription>
        </SheetHeader>

        <AcceptEnrollmentsForm
          enrollmentIds={enrollmentIds as Id<"schoolEnrollments">[]}
          setShowSheet={setShowSheet}
        />
      </SheetContent>
    </Sheet>
  );
}
