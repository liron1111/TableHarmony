import Link from "next/link";

import { siteConfig } from "@/config/site";

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

export function HeroSection() {
  return (
    <section className="container py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
      <div className="flex flex-col items-center space-y-7 text-center">
        <h1 className="max-w-3xl text-4xl font-bold leading-none tracking-tight md:text-6xl xl:text-7xl">
          {siteConfig.title}
        </h1>
        <p className="max-w-sm font-light text-muted-foreground md:text-lg lg:text-xl">
          {siteConfig.description}
        </p>
        <SignedOut>
          <SignInButton mode="modal">
            <Button className="w-56">
              Get started <ArrowRightIcon className="ml-2 size-4" />
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <Button className="w-56" asChild>
            <Link href="/schools">Dashboard</Link>
          </Button>
        </SignedIn>
      </div>
    </section>
  );
}
