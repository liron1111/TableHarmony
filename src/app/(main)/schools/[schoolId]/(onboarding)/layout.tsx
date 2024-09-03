import { SchoolProvider } from "../_components/providers/school-provider";
import { MembershipProvider } from "../_components/providers/membership-provider";

import { createMetadata } from "@/utils/metadata";

const metadata = createMetadata({
  title: "Onboarding",
  description: "Onboarding",
});

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SchoolProvider>
      <MembershipProvider>{children}</MembershipProvider>
    </SchoolProvider>
  );
}
