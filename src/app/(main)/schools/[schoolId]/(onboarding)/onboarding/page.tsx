"use client";

import { useQuery } from "convex/react";
import { useSchool } from "../../_components/providers/school-provider";
import { api } from "../../../../../../../convex/_generated/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { CompleteOnboardingButton } from "./_components/onboarding-complete";
import { useMembership } from "../../_components/providers/membership-provider";

export default function OnboardingPage() {
  const { school } = useSchool();
  const { membership } = useMembership();
  const user = useQuery(api.users.getCurrentUser);

  return (
    <div className="relative mx-auto mt-20 flex w-full max-w-md flex-col justify-center space-y-6 px-4 pb-20 text-center md:px-0">
      <div className="flex justify-center">
        <div className="-mr-2 flex size-20 items-center justify-center rounded-full">
          <Avatar className="size-full">
            <AvatarImage src={user?.image} />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </div>
        <div className="z-10 -ml-2 flex size-20 items-center justify-center rounded-full">
          <Avatar className="size-full">
            <AvatarImage src={school?.image} />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div>
        <PageHeaderHeading>
          Welcome to <span className="text-primary">{school?.name}</span>
        </PageHeaderHeading>
        <PageHeaderDescription>
          We&apos;ll help you get set up 👋
        </PageHeaderDescription>
      </div>
      <Separator />
      <p>You are a {membership?.role}</p>
      <CompleteOnboardingButton />
    </div>
  );
}
