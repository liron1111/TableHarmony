import { AvatarGroup } from "./_components/avatar-group";
import { CurrentScreen } from "./_components/current-screen";
import { OnboardingNavigation } from "./_components/onboarding-navigation";

export default function OnboardingPage({
  searchParams,
}: {
  searchParams: { screen: string };
}) {
  return (
    <div className="relative mx-auto mt-20 flex w-full max-w-md flex-col justify-center space-y-6 px-4 pb-20 text-center md:px-0">
      <AvatarGroup />
      <CurrentScreen />
      <OnboardingNavigation />
    </div>
  );
}
