"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSchool } from "@/app/(main)/schools/[schoolId]/_components/providers/school-provider";

export function SchoolImage() {
  const { school } = useSchool();

  return (
    <Avatar>
      <AvatarImage src={school?.image} />
      <AvatarFallback>SC</AvatarFallback>
    </Avatar>
  );
}
