import { SchoolProvider } from "../_components/providers/school-provider";
import { MembershipProvider } from "../_components/providers/membership-provider";
import { ScreensProvider } from "./onboarding/_components/screens-provider";

import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "Onboarding",
  description: "Setup and get started with this school",
});

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SchoolProvider>
      <MembershipProvider>
        <ScreensProvider>
          <div className="flex min-h-[calc(100vh-65px)] w-full flex-col items-center bg-shapes-background bg-cover bg-center bg-no-repeat">
            {children}
          </div>
        </ScreensProvider>
      </MembershipProvider>
    </SchoolProvider>
  );
}
