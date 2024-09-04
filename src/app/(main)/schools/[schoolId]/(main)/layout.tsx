import { Id } from "../../../../../../convex/_generated/dataModel";
import { api } from "../../../../../../convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

import { SchoolProvider } from "../_components/providers/school-provider";
import { MembershipProvider } from "../_components/providers/membership-provider";
import { SchoolSidebar } from "./_components/sidebar";

import { createMetadata } from "@/utils/metadata";

export async function generateMetadata({
  params,
}: {
  params: { schoolId: Id<"schools"> };
}) {
  const school = await fetchQuery(api.schools.getSchool, {
    schoolId: params.schoolId,
  });

  return createMetadata({
    title: school?.name ?? "School",
    description: school?.description ?? "school description",
  });
}

export default function SchoolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SchoolProvider>
      <MembershipProvider>
        <div className="flex">
          <SchoolSidebar />
          <div className="relative w-full overflow-x-auto">
            <div className="overflow-auto md:h-[calc(100vh-65px)]">
              <div className="relative mx-auto w-full pb-4 pl-0 pr-4 md:pl-4 md:pr-6">
                {children}
              </div>
            </div>
          </div>
        </div>
      </MembershipProvider>
    </SchoolProvider>
  );
}
