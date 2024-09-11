"use client";

import { Dispatch, SetStateAction, useState } from "react";

import { api } from "../../../../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";

import { useMembership } from "@/app/(main)/schools/[schoolId]/_components/providers/membership-provider";
import { useCourse } from "../../../_components/providers/course-provider";

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

function DeleteClassForm({
  classId,
  setShowCredenza,
}: {
  classId: Id<"classes">;
  setShowCredenza: Dispatch<SetStateAction<boolean>>;
}) {
  const [isPending, setIsPending] = useState(false);
  const deleteClass = useMutation(api.classes.deleteClass);

  async function onSubmit() {
    setIsPending(true);

    try {
      await deleteClass({ classId });
      toast.success("Deleted class successfully!");
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

export function DeleteClassDialog({
  classId,
  children,
}: {
  classId: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { membership } = useMembership();
  const { membership: courseMembership } = useCourse();

  if (membership?.role !== "manager" && courseMembership?.role !== "manager")
    return null;

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaTrigger>{children}</CredenzaTrigger>

      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Delete class</CredenzaTitle>
          <CredenzaDescription>
            This class will immediately be deleted. Once deleted, you&apos;ll no
            longer be able to view or modify it.
          </CredenzaDescription>
        </CredenzaHeader>

        <DeleteClassForm
          classId={classId as Id<"classes">}
          setShowCredenza={setOpen}
        />
      </CredenzaContent>
    </Credenza>
  );
}
