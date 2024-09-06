"use client";

import { useSchool } from "@/app/(main)/schools/[schoolId]/_components/providers/school-provider";
import { useMembership } from "../../../_components/providers/membership-provider";

import {
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
import { PartyPopperIcon } from "lucide-react";

export function WelcomeScreen() {
  const { school } = useSchool();
  const { membership } = useMembership();

  return (
    <div className="flex flex-col space-y-6">
      <div>
        <PageHeaderHeading>
          Welcome to <span className="text-primary">{school?.name}</span>
        </PageHeaderHeading>
        <PageHeaderDescription>
          We&apos;ll help you get set up 👋
        </PageHeaderDescription>
      </div>
      <Separator />
      <div className="flex items-center justify-center gap-2 font-medium text-muted-foreground">
        <span>You are going to be a {membership?.role}</span>
        <PartyPopperIcon className="size-4" />
      </div>
    </div>
  );
}
