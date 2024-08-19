"use client";

import { Button } from "@/components/ui/button";
import { SearchIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MainLinks() {
  const path = usePathname();

  return (
    <div className="hidden items-center gap-2 md:flex">
      {/**
       * 
      <Button
        variant="ghost"
        className={path === "/browse" ? "bg-muted" : ""}
        asChild
      >
        <Link className="flex items-center gap-2" href="/browse">
          <SearchIcon className="size-4" />
          <span>Browse</span>
        </Link>
      </Button>
      */}
      <Button
        variant="ghost"
        className={path === "/account-settings" ? "bg-muted" : ""}
        asChild
      >
        <Link className="flex items-center gap-2" href="/account-settings">
          <SettingsIcon className="size-4" />
          <span>Account settings</span>
        </Link>
      </Button>
    </div>
  );
}
