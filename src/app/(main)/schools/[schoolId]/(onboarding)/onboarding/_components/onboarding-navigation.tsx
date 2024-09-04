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
import { useScreens } from "./screens-provider";

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
    <LoaderButton className="w-full" isLoading={isPending} onClick={onSubmit}>
      Complete
    </LoaderButton>
  );
}

export function OnboardingNavigation() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { screens } = useScreens();

  const screenKeys = Object.keys(screens);
  const totalScreens = screenKeys.length;
  const currentScreenKey = searchParams.get("screen") || screenKeys[0];
  const currentScreenIndex = screenKeys.indexOf(currentScreenKey);

  function setScreen(screen: string) {
    const params = new URLSearchParams(searchParams);
    if (screen) {
      params.set("screen", screen);
    } else {
      params.delete("screen");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const handleNext = () => {
    if (currentScreenIndex < totalScreens - 1) {
      setScreen(screenKeys[currentScreenIndex + 1]);
    }
  };

  return (
    <div className="w-full">
      {currentScreenIndex === totalScreens - 1 ? (
        <CompleteOnboardingButton />
      ) : (
        <Button className="w-full" onClick={handleNext}>
          Continue
        </Button>
      )}
    </div>
  );
}
