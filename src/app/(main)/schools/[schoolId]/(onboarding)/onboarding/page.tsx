import { AvatarGroup } from "./_components/avatar-group";
import { CompleteOnboardingButton } from "./_components/onboarding-navigation";
import { WelcomeScreen } from "./_components/welcome-screen";

export default function OnboardingPage() {
  return (
    <div className="relative mx-auto mt-20 flex w-full max-w-md flex-col justify-center space-y-6 px-4 pb-20 text-center md:px-0">
      <AvatarGroup />
      <WelcomeScreen />
      <CompleteOnboardingButton />
    </div>
  );
}
