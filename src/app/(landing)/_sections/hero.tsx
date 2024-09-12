import Link from "next/link";

import { siteConfig } from "@/config/site";

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="container py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
      <div className="flex flex-col items-center space-y-7 text-center">
        <h1 className="max-w-3xl text-4xl font-semibold leading-none tracking-tight md:text-5xl xl:text-7xl">
          {siteConfig.title}
        </h1>
        <p className="max-w-sm font-light text-muted-foreground md:text-lg lg:text-xl">
          {siteConfig.description}
        </p>
        <SignedOut>
          <SignInButton mode="modal">
            <Button className="group w-56">
              Get started
              <ArrowRightIcon className="ml-0 size-0 opacity-0 transition-all duration-200 group-hover:ml-2 group-hover:size-4 group-hover:opacity-100" />
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <Button className="w-56" asChild>
            <Link href="/schools">Dashboard</Link>
          </Button>
        </SignedIn>
        <div className="max-w-6xl px-6 pt-8 sm:max-w-4xl md:max-w-screen-xl lg:px-8">
          <div className="-m-2 rounded-xl bg-neutral-900/5 p-2 ring-1 ring-inset ring-neutral-900/10 dark:bg-neutral-100/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <Image
              alt="Hero Image"
              width="1222"
              height="636"
              className="rounded-md bg-white shadow-2xl ring-1 ring-neutral-900/10 dark:hidden"
              src="/landing/hero-light.png"
            />
            <Image
              alt="Hero Image"
              width="1222"
              height="636"
              className="hidden rounded-md bg-black shadow-2xl ring-1 ring-neutral-900/10 dark:block"
              src="/landing/hero-dark.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
