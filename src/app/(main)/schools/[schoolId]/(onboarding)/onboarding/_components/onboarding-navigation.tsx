"use client";

import { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { useMutation } from "convex/react";
import { api } from "../../../../../../../../convex/_generated/api";

import { useMembership } from "../../../_components/providers/membership-provider";

import { toast } from "sonner";
import { LoaderButton } from "@/components/loader-button";
import { Button } from "@/components/ui/button";

import { shapeErrors } from "@/utils/errors";

function CompleteOnboardingButton() {
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
    <LoaderButton size="lg" isLoading={isPending} onClick={onSubmit}>
      Complete
    </LoaderButton>
  );
}

export function OnboardingNavigation() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentScreen = Number(searchParams.get("screen") || "1");
  const totalScreens = 3;

  function setScreen(screen: string) {
    const params = new URLSearchParams(searchParams);
    if (screen) {
      params.set("screen", screen);
    } else {
      params.delete("screen");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const handleBack = () => {
    if (currentScreen > 1) {
      setScreen((currentScreen - 1).toString());
    }
  };

  const handleNext = () => {
    if (currentScreen < totalScreens) {
      setScreen((currentScreen + 1).toString());
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        onClick={handleBack}
        disabled={currentScreen === 1}
        size="lg"
      >
        Back
      </Button>
      {currentScreen === totalScreens ? (
        <div className="inline-block">
          <CompleteOnboardingButton />
        </div>
      ) : (
        <Button size="lg" onClick={handleNext}>
          Next
        </Button>
      )}
    </div>
  );
}
