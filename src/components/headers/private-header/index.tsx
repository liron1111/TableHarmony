"use client";

import { useParams } from "next/navigation";

import { HeaderActions } from "./header-actions";
import { HeaderLinks } from "./header-links";

import { SchoolProvider } from "@/app/(main)/schools/[schoolId]/_components/providers/school-provider";
import { SchoolsCombobox } from "@/app/(main)/schools/[schoolId]/_components/schools-combobox";
import { MembershipProvider } from "@/app/(main)/schools/[schoolId]/_components/providers/membership-provider";
import { SchoolSidebarMobile } from "@/app/(main)/schools/[schoolId]/(main)/_components/sidebar";

export function PrivateHeader() {
  const { schoolId } = useParams();

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur transition-all duration-300 supports-[backdrop-filter]:bg-background/60">
      <div className="flex flex-col items-center justify-between gap-4 p-4 md:hidden">
        <div className="flex w-full items-center justify-between">
          <HeaderLinks />
          <HeaderActions />
        </div>
        {schoolId && (
          <div className="flex w-full items-center gap-2">
            <SchoolProvider>
              <MembershipProvider>
                <SchoolSidebarMobile />
                <SchoolsCombobox />
              </MembershipProvider>
            </SchoolProvider>
          </div>
        )}
      </div>
      <div className="hidden h-14 w-full items-center justify-between p-8 md:flex">
        <HeaderLinks />
        <HeaderActions />
      </div>
    </header>
  );
}
