"use client";

import { Dispatch, SetStateAction, useState } from "react";

import { api } from "../../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../../convex/_generated/dataModel";
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
import { useMembership } from "../../../_components/providers/membership-provider";

function DeleteSemesterForm({
  semesterId,
  setShowCredenza,
}: {
  semesterId: Id<"semesters">;
  setShowCredenza: Dispatch<SetStateAction<boolean>>;
}) {
  const [isPending, setIsPending] = useState(false);
  const deleteSemester = useMutation(api.semesters.deleteSemester);

  async function onSubmit() {
    setIsPending(true);

    try {
      await deleteSemester({ semesterId });
      toast.success("Deleted semester successfully!");
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

export function DeleteSemesterDialog({
  semesterId,
  children,
}: {
  semesterId: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { membership } = useMembership();

  if (membership?.role !== "manager") return null;

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaTrigger>{children}</CredenzaTrigger>

      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Delete semester</CredenzaTitle>
          <CredenzaDescription>
            This semester will immediately be deleted. Once deleted, yo&apos;ll
            no longer be able to view or modify it.
          </CredenzaDescription>
        </CredenzaHeader>

        <DeleteSemesterForm
          semesterId={semesterId as Id<"semesters">}
          setShowCredenza={setOpen}
        />
      </CredenzaContent>
    </Credenza>
  );
}
