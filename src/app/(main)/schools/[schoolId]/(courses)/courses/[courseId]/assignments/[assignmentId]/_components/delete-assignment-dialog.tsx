"use client";

import { Dispatch, SetStateAction, useState } from "react";

import { api } from "../../../../../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";

import { useCourse } from "../../../../_components/providers/course-provider";

import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import { toast } from "sonner";
import { LoaderButton } from "@/components/loader-button";
import { Button } from "@/components/ui/button";

import { shapeErrors } from "@/utils/errors";

function DeleteAssignmentForm({
  assignmentId,
  setShowCredenza,
}: {
  assignmentId: Id<"courseAssignments">;
  setShowCredenza: Dispatch<SetStateAction<boolean>>;
}) {
  const [isPending, setIsPending] = useState(false);
  const deleteAssignment = useMutation(api.courseAssignments.deleteAssignment);

  async function onSubmit() {
    setIsPending(true);

    try {
      await deleteAssignment({ assignmentId });
      toast.success("Deleted assignment successfully!");
    } catch (error) {
      const formattedError = shapeErrors({ error });
      toast.error(formattedError.message);
    }

    setIsPending(false);
    setShowCredenza(false);
  }

  return (
    <div className="mt-4 flex w-full gap-2">
      <Button
        variant="outline"
        className="w-full"
        onClick={() => setShowCredenza(false)}
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

export function DeleteAssignmentDialog({
  children,
  assignmentId,
}: {
  children: React.ReactNode;
  assignmentId: Id<"courseAssignments">;
}) {
  const [open, setOpen] = useState(false);
  const { membership } = useCourse();

  if (membership?.role !== "manager") return null;

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaTrigger>{children}</CredenzaTrigger>

      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Delete assignment</CredenzaTitle>
          <CredenzaDescription>
            This assignment will immediately be deleted. Once deleted,
            you&apos;ll no longer be able to view or modify it.
          </CredenzaDescription>
        </CredenzaHeader>

        <DeleteAssignmentForm
          assignmentId={assignmentId as Id<"courseAssignments">}
          setShowCredenza={setOpen}
        />
      </CredenzaContent>
    </Credenza>
  );
}
