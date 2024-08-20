import Link from "next/link";
import { Suspense } from "react";

import { SignedIn } from "@clerk/nextjs";

import { LogoIcon } from "@/components/icons";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { SlashIcon } from "lucide-react";

import { fetchQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import { ClientProfile } from "./profile";

export async function HeaderLinks({ links }: { links?: React.ReactNode }) {
  const user = await fetchQuery(api.users.getCurrentUser);

  return (
    <SignedIn>
      <div className="flex items-center gap-4">
        <Link href="/schools">
          <LogoIcon />
        </Link>

        <SlashIcon className="size-4 -rotate-12" />

        <ClientProfile />

        {/**
         * 
        <Suspense fallback={<Skeleton className="h-[20px] w-[100px]" />}>
          <Profile />
        </Suspense>
        */}
        {links}
      </div>
    </SignedIn>
  );
}

async function Profile() {
  const user = await fetchQuery(api.users.getCurrentUser);

  return (
    <Link href="/schools" className="flex items-center gap-2">
      <Avatar className="size-6">
        <AvatarImage src={user?.image} alt="profile" />
        <AvatarFallback className="text-xs">SC</AvatarFallback>
      </Avatar>
      <span>{user?.name}</span>
    </Link>
  );
}
