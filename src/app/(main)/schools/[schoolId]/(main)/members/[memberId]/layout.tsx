import { api } from "../../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../../convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";

import { createMetadata } from "@/utils/metadata";

import { MemberProvider } from "./_components/member-provider";
import { MemberHeader } from "./_components/member-header";

export async function generateMetadata({
  params,
}: {
  params: { schoolId: Id<"schools">; memberId: Id<"users"> };
}) {
  const member = await fetchQuery(api.users.getUserById, {
    userId: params.memberId,
  });

  const school = await fetchQuery(api.schools.getSchool, {
    schoolId: params.schoolId,
  });

  return createMetadata({
    title: `${member?.name} | ${school?.name}`,
  });
}

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MemberProvider>
      <MemberHeader />
      <div className="pb-4">{children}</div>
    </MemberProvider>
  );
}
