"use client";

import Link from "next/link";
import { SignInButton, useSession } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function MenuButton() {
  const { isSignedIn, isLoaded } = useSession();

  if (!isLoaded) return <Skeleton className="h-6 w-20" />;

  if (!isSignedIn) {
    return (
      <SignInButton>
        <Button>Sign in</Button>
      </SignInButton>
    );
  }

  return (
    <Button asChild>
      <Link href="/schools">Dashboard</Link>
    </Button>
  );
}
