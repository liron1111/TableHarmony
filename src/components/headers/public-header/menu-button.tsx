"use client";

import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  useSession,
} from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useMediaQuery from "@/hooks/use-media-query";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MenuIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/mode-toggle";

export function MenuButton() {
  const { isLoaded } = useSession();
  const { isMobile } = useMediaQuery();

  const [open, setIsOpen] = useState(false);

  if (!isLoaded) return <Skeleton className="h-8 w-24" />;

  return (
    <div className="flex items-center gap-2">
      <SignedIn>
        <Button asChild>
          <Link href="/schools">Dashboard</Link>
        </Button>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button>Sign in</Button>
        </SignInButton>
      </SignedOut>

      {isMobile && (
        <Popover open={open} onOpenChange={setIsOpen}>
          <PopoverTrigger>
            <Button size="icon" variant="ghost" aria-label="menu">
              <MenuIcon className="size-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="max-w-[275px]" align="end">
            <div className="flex flex-col space-y-4 text-sm text-muted-foreground">
              <Link
                href="/changelog"
                className="hover:text-neutral-700 dark:hover:text-neutral-200"
                onClick={() => setIsOpen(false)}
              >
                Changelog
              </Link>
              <Link
                href="/contact"
                className="hover:text-neutral-700 dark:hover:text-neutral-200"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Separator />
              <div className="flex items-center justify-between">
                Theme <ModeToggle />
              </div>
              <SignedIn>
                <SignOutButton>
                  <span className="cursor-pointer hover:text-neutral-700 dark:hover:text-neutral-200">
                    Sign out
                  </span>
                </SignOutButton>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <span className="cursor-pointer hover:text-neutral-700 dark:hover:text-neutral-200">
                    Sign in
                  </span>
                </SignInButton>
              </SignedOut>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
