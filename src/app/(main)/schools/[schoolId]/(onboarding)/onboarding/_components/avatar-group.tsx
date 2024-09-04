"use client";

import { useSession } from "@clerk/nextjs";
import { useSchool } from "@/app/(main)/schools/[schoolId]/_components/providers/school-provider";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AvatarGroup() {
  const { school } = useSchool();
  const { session } = useSession();

  return (
    <div className="flex justify-center">
      <div className="-mr-2 flex size-16 items-center justify-center rounded-full">
        <Avatar className="size-full">
          <AvatarImage alt="profile" src={session?.user.imageUrl} />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
      </div>
      <div className="z-10 -ml-2 flex size-16 items-center justify-center rounded-full">
        <Avatar className="size-full">
          <AvatarImage alt="school logo" src={school?.image} />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
