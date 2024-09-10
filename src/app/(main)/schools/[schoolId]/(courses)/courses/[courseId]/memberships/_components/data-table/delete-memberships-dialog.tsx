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

function DeleteMembershipsForm({
  membershipIds,
  setShowDialog,
}: {
  membershipIds: Id<"courseMemberships">[];
  setShowDialog: Dispatch<SetStateAction<boolean>>;
}) {
  const [isPending, setIsPending] = useState(false);
  const deleteMemberships = useMutation(
    api.courseMemberships.deleteCourseMemberships
  );

  async function onSubmit() {
    setIsPending(true);

    try {
      await deleteMemberships({ membershipIds });
      toast.success("Deleted memberships successfully!");
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
        variant="destructive"
        isLoading={isPending}
        className="w-full"
        onClick={onSubmit}
      >
        Confirm
      </LoaderButton>
    </div>
  );
}

export function DeleteMembershipsDialog({
  membershipIds,
  children,
}: {
  membershipIds: string[];
  children: React.ReactNode;
}) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Credenza open={showDialog} onOpenChange={setShowDialog}>
      <CredenzaTrigger>{children}</CredenzaTrigger>

      <CredenzaContent>
        <CredenzaHeader>
          {membershipIds.length > 1 ? (
            <>
              <CredenzaTitle>Delete selected memberships</CredenzaTitle>
              <CredenzaDescription>
                These memberships will immediately be deleted. Once deleted,
                yo&apos;ll no longer be able to view or modify it.
              </CredenzaDescription>
            </>
          ) : (
            <>
              <CredenzaTitle>Delete membership</CredenzaTitle>
              <CredenzaDescription>
                This membership will immediately be deleted. Once deleted,
                yo&apos;ll no longer be able to view or modify it.
              </CredenzaDescription>
            </>
          )}
        </CredenzaHeader>

        <DeleteMembershipsForm
          membershipIds={membershipIds as Id<"courseMemberships">[]}
          setShowDialog={setShowDialog}
        />
      </CredenzaContent>
    </Credenza>
  );
}
