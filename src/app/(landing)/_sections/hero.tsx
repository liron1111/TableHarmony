import Link from "next/link";

import { siteConfig } from "@/config/site";

import { SignedIn, SignedOut } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

export function HeroSection() {
  return (
    <section className="container py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
      <div className="flex flex-col items-center space-y-7 text-center">
        <h1 className="max-w-3xl text-4xl font-semibold leading-none tracking-tight md:text-6xl md:font-extrabold xl:text-7xl">
          Manage Your Schools in One Place
        </h1>
        <p className="max-w-sm font-light text-muted-foreground md:text-lg lg:text-xl">
          {siteConfig.description}
        </p>
        <SignedOut>
          <Button className="w-56" asChild>
            <Link href="/sign-in">
              Get started <ArrowRightIcon className="ml-2 size-4" />
            </Link>
          </Button>
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
