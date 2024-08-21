"use client";

import { api } from "../../../../convex/_generated/api";
import { useConvexAuth, useQuery } from "convex/react";

import useMediaQuery from "@/hooks/use-media-query";
import { usePathname } from "next/navigation";

import Link from "next/link";

import { LogoIcon } from "@/components/icons";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { SettingsIcon, SlashIcon } from "lucide-react";
import { SchoolsCombobox } from "@/app/(main)/schools/[schoolId]/schools-combobox";

export function HeaderLinks() {
  const { isMobile } = useMediaQuery();
  const { isLoading } = useConvexAuth();

  if (isMobile) {
    return (
      <Link href="/schools">
        <LogoIcon />
      </Link>
    );
  }

  // TODO: fix bug on mobile this appears

  return (
    <div className="flex items-center gap-4">
      <Link href="/schools">
        <LogoIcon />
      </Link>

      <SlashIcon className="size-3 -rotate-12 text-muted-foreground" />

      {isLoading ? <Skeleton className="h-5 w-28" /> : <Profile />}

      <Links />
    </div>
  );
}

function Profile() {
  const user = useQuery(api.users.getCurrentUser);

  return (
    <Link href="/schools" className="flex items-center gap-2">
      <Avatar className="size-6">
        <AvatarImage src={user?.image} alt="profile" />
      </Avatar>
      <span className="text-sm">{user?.name}</span>
    </Link>
  );
}

function Links() {
  const path = usePathname();
  const segments = path.split("/").filter(Boolean);

  const hasIds = segments.length > 1 && segments.at(0) === "schools";

  if (!hasIds) {
    return (
      <div className="hidden items-center gap-2 md:flex">
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

  const schoolId = segments.at(1);

  if (!schoolId) return;

  return (
    <div className="flex items-center gap-2">
      <SlashIcon className="size-3 -rotate-12 text-muted-foreground" />
      <SchoolsCombobox schoolId={schoolId} />
    </div>
  );
}
