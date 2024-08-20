"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function ClientProfile() {
  const user = useQuery(api.users.getCurrentUser);

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
