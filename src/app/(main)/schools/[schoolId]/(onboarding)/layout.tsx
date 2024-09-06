import { Metadata } from "next";

export const metadata: Metadata = {
  description: "Setup and get started with this school",
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-65px)] w-full flex-col items-center bg-shapes-background bg-cover bg-center bg-no-repeat">
      {children}
    </div>
  );
}
