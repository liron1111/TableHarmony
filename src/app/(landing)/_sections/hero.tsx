import Link from "next/link";

import { siteConfig } from "@/config/site";

import { SignedIn, SignedOut } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="container py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
      <div className="flex flex-col items-center space-y-7 text-center">
        <h1 className="max-w-3xl text-5xl font-extrabold leading-none tracking-tight md:text-6xl xl:text-7xl">
          Manage Your Schools in One Place
        </h1>
        <p className="max-w-sm font-light text-muted-foreground md:text-lg lg:text-xl">
          {siteConfig.description}
        </p>
        <SignedOut>
          <Button className="w-72" asChild>
            <Link href="/sign-in">
              Get started <ArrowRightIcon className="ml-2 size-4" />
            </Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <Button className="w-72" asChild>
            <Link href="/schools">Dashboard</Link>
          </Button>
        </SignedIn>

        <div className="max-w-6xl px-6 pt-8 sm:max-w-4xl md:max-w-screen-xl lg:px-8">
          <div className="-m-2 rounded-xl bg-neutral-900/5 p-2 ring-1 ring-inset ring-neutral-900/10 dark:bg-neutral-100/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <Image src="/hero.png" alt="Hero image" width="1222" height="636" />
          </div>
        </div>
      </div>
    </section>
  );
}
