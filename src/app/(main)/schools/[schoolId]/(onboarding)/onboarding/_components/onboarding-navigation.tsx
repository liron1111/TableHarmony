"use client";

import { useState } from "react";

import { useMutation } from "convex/react";
import { api } from "../../../../../../../../convex/_generated/api";

import { useMembership } from "../../../_components/providers/membership-provider";

import { toast } from "sonner";
import { LoaderButton } from "@/components/loader-button";

import { shapeErrors } from "@/utils/errors";

export function CompleteOnboardingButton() {
  const [isPending, setIsPending] = useState(false);
  const completeOnboarding = useMutation(
    api.schoolMemberships.completeOnboarding
  );
  const { membership } = useMembership();

  async function onSubmit() {
    if (!membership) return;

    setIsPending(true);

    try {
      await completeOnboarding({ membershipId: membership._id });
    } catch (error) {
      const formattedError = shapeErrors({ error });
      toast.error(formattedError.message);
    }

    setIsPending(false);
  }

  return (
    <LoaderButton className="w-full" isLoading={isPending} onClick={onSubmit}>
      Complete
    </LoaderButton>
  );
}
