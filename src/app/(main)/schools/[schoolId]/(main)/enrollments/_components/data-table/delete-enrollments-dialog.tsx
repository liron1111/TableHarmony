"use client";

import { Dispatch, SetStateAction, useState } from "react";

import { api } from "../../../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../../../convex/_generated/dataModel";
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

function DeleteEnrollmentForm({
  enrollmentIds,
  setShowDialog,
}: {
  enrollmentIds: Id<"schoolEnrollments">[];
  setShowDialog: Dispatch<SetStateAction<boolean>>;
}) {
  const [isPending, setIsPending] = useState(false);
  const deleteEnrollments = useMutation(
    api.schoolEnrollments.deleteSchoolEnrollments
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
          <CredenzaTitle>Delete Enrollment</CredenzaTitle>
          <CredenzaDescription>
            Once deleted, you&apos;ll no longer be able to view or modify it.
          </CredenzaDescription>
        </CredenzaHeader>

        <DeleteEnrollmentForm
          enrollmentIds={enrollmentIds as Id<"schoolEnrollments">[]}
          setShowDialog={setShowDialog}
        />
      </CredenzaContent>
    </Credenza>
  );
}
