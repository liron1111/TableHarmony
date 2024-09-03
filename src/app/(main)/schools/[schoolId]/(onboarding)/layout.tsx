import { SchoolProvider } from "../_components/providers/school-provider";
import { MembershipProvider } from "../_components/providers/membership-provider";

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
        <div className="bg-shapes-background flex min-h-[calc(100vh-65px)] w-full flex-col items-center bg-cover bg-center bg-no-repeat">
          {children}
        </div>
      </MembershipProvider>
    </SchoolProvider>
  );
}
