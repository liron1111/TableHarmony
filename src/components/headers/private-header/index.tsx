"use client";

import { SchoolsCombobox } from "@/app/(main)/schools/[schoolId]/_components/schools-combobox";
import { HeaderActions } from "./header-actions";
import { HeaderLinks } from "./header-links";
import { School } from "@/app/(main)/schools/[schoolId]/_components/school-context";
import { SchoolSidebarMobile } from "@/app/(main)/schools/[schoolId]/_components/sidebar";
import useMediaQuery from "@/hooks/use-media-query";
import { usePathname } from "next/navigation";

export function PrivateHeader() {
  const { isMobile } = useMediaQuery();
  const path = usePathname();

  const segments = path.split("/").filter(Boolean);
  const hasIds = segments.length > 1 && segments.at(0) === "schools";
  const schoolId = hasIds ? segments.at(1) : null;

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur transition-all duration-300 supports-[backdrop-filter]:bg-background/60">
      <div className="flex flex-col items-center justify-between gap-4 p-4 md:hidden">
        <div className="flex w-full items-center justify-between">
          <HeaderLinks />
          <HeaderActions />
        </div>
        {schoolId && (
          <School schoolId={schoolId}>
            <div className="flex w-full gap-2">
              {isMobile && <SchoolSidebarMobile />}
              <SchoolsCombobox />
            </div>
          </School>
        )}
      </div>
      <div className="hidden h-14 w-full items-center justify-between p-8 md:flex">
        <HeaderLinks />
        <HeaderActions />
      </div>
    </header>
  );
}
