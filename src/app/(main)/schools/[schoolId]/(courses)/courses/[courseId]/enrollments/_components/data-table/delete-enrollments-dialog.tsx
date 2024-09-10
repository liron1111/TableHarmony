"use client";

import { Dispatch, SetStateAction, useState } from "react";

import { api } from "../../../../../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";

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

function DeleteEnrollmentsForm({
  enrollmentIds,
  setShowDialog,
}: {
  enrollmentIds: Id<"courseEnrollments">[];
  setShowDialog: Dispatch<SetStateAction<boolean>>;
}) {
  const [isPending, setIsPending] = useState(false);
  const deleteEnrollments = useMutation(
    api.courseEnrollments.deleteCourseEnrollments
  );

  async function onSubmit() {
    setIsPending(true);

    try {
      await deleteEnrollments({ enrollmentIds });
      toast.success("Deleted enrollments successfully!");
    } catch (error) {
      const formattedError = shapeErrors({ error });
      toast.error(formattedError.message);
    }

    setIsPending(false);
    setShowDialog(false);
  }

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        className="w-full"
        onClick={() => setShowDialog(false)}
      >
        Cancel
      </Button>
      <LoaderButton
        isLoading={isPending}
        className="w-full"
        variant="destructive"
        onClick={onSubmit}
      >
        Confirm
      </LoaderButton>
    </div>
  );
}

export function DeleteEnrollmentsDialog({
  enrollmentIds,
  children,
}: {
  enrollmentIds: string[];
  children: React.ReactNode;
}) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Credenza open={showDialog} onOpenChange={setShowDialog}>
      <CredenzaTrigger>{children}</CredenzaTrigger>

      <CredenzaContent>
        <CredenzaHeader>
          {enrollmentIds.length > 1 ? (
            <>
              <CredenzaTitle>Delete selected enrollments</CredenzaTitle>
              <CredenzaDescription>
                These enrollments will immediately be deleted. Once deleted,
                yo&apos;ll no longer be able to view or modify it.
              </CredenzaDescription>
            </>
          ) : (
            <>
              <CredenzaTitle>Delete enrollment</CredenzaTitle>
              <CredenzaDescription>
                This enrollment will immediately be deleted. Once deleted,
                yo&apos;ll no longer be able to view or modify it.
              </CredenzaDescription>
            </>
          )}
        </CredenzaHeader>

        <DeleteEnrollmentsForm
          enrollmentIds={enrollmentIds as Id<"courseEnrollments">[]}
          setShowDialog={setShowDialog}
        />
      </CredenzaContent>
    </Credenza>
  );
}
