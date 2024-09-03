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

function AcceptEnrollmentsForm({
  enrollmentIds,
  setShowDialog,
}: {
  enrollmentIds: Id<"schoolEnrollments">[];
  setShowDialog: Dispatch<SetStateAction<boolean>>;
}) {
  const [isPending, setIsPending] = useState(false);
  const approveEnrollments = useMutation(api.schools.approveEnrollments);

  async function onSubmit() {
    setIsPending(true);

    try {
      await approveEnrollments({ enrollmentIds });
      toast.success("Accpeted enrollments successfully!");
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
      <LoaderButton isLoading={isPending} className="w-full" onClick={onSubmit}>
        Accept
      </LoaderButton>
    </div>
  );
}

export function AcceptEnrollmentsDialog({
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
          <CredenzaTitle>Accept Enrollments</CredenzaTitle>
          <CredenzaDescription>
            Accept these enrollments to your school.
          </CredenzaDescription>
        </CredenzaHeader>

        <AcceptEnrollmentsForm
          enrollmentIds={enrollmentIds as Id<"schoolEnrollments">[]}
          setShowDialog={setShowDialog}
        />
      </CredenzaContent>
    </Credenza>
  );
}
