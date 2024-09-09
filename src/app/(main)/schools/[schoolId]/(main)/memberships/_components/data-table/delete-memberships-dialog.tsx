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

function DeleteMembershipsForm({
  membershipIds,
  setShowCredenza,
}: {
  membershipIds: Id<"schoolMemberships">[];
  setShowCredenza: Dispatch<SetStateAction<boolean>>;
}) {
  const [isPending, setIsPending] = useState(false);
  const deleteMemberships = useMutation(
    api.schoolMemberships.deleteSchoolMemberships
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

export function DeleteMembershipsDialog({
  membershipIds,
  children,
}: {
  membershipIds: string[];
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaTrigger>{children}</CredenzaTrigger>

      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Delete Memberships</CredenzaTitle>
          <CredenzaDescription>
            These memberships will immediately be deleted. Once deleted,
            you&apos;ll no longer be able to view or modify it.
          </CredenzaDescription>
        </CredenzaHeader>

        <DeleteMembershipsForm
          membershipIds={membershipIds as Id<"schoolMemberships">[]}
          setShowCredenza={setOpen}
        />
      </CredenzaContent>
    </Credenza>
  );
}
