"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import useMediaQuery from "@/hooks/use-media-query";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { useState } from "react";

export function MenuButton() {
  const { isMobile } = useMediaQuery();
  const [open, setIsOpen] = useState(false);

  if (!isMobile) {
    return <UserButton />;
  }

  return (
    <Popover open={open} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Button size="icon" variant="ghost" aria-label="menu">
          <MenuIcon className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[275px]" align="end">
        <div className="flex flex-col space-y-4 text-sm text-muted-foreground">
          <Link
            href="/schools"
            className="hover:text-neutral-700 dark:hover:text-neutral-200"
            onClick={() => setIsOpen(false)}
          >
            Schools
          </Link>
          <Link
            href="/account-settings"
            className="hover:text-neutral-700 dark:hover:text-neutral-200"
            onClick={() => setIsOpen(false)}
          >
            Account settings
          </Link>
          <Separator />
          <div className="flex items-center justify-between">
            Theme <ModeToggle />
          </div>
          <SignOutButton>
            <span className="cursor-pointer hover:text-neutral-700 dark:hover:text-neutral-200">
              Sign out
            </span>
          </SignOutButton>
        </div>
      </PopoverContent>
    </Popover>
  );
}
