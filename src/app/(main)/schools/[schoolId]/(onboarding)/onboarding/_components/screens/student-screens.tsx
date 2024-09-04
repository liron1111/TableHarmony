"use client";

import {
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { useSchool } from "@/app/(main)/schools/[schoolId]/_components/providers/school-provider";

function WelcomeScreen() {
  const { school } = useSchool();

  return (
    <div className="space-y-6">
      <div>
        <PageHeaderHeading>
          Welcome to <span className="text-primary">{school?.name}</span>
        </PageHeaderHeading>
        <PageHeaderDescription>
          We&apos;ll help you get set up 👋
        </PageHeaderDescription>
      </div>
    </div>
  );
}

function SupportScreen() {
  return <div>You are going to be a student</div>;
}

export const studentScreens = {
  welcome: WelcomeScreen,
  support: SupportScreen,
};
