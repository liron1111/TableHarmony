import { SchoolsCombobox } from "@/app/(main)/schools/[schoolId]/_components/schools-combobox";
import { HeaderActions } from "./header-actions";
import { HeaderLinks } from "./header-links";

export function PrivateHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur transition-all duration-300 supports-[backdrop-filter]:bg-background/60">
      <div className="flex flex-col items-center justify-between gap-4 p-4 md:hidden">
        <div className="flex w-full items-center justify-between">
          <HeaderLinks />
          <HeaderActions />
        </div>
        <SchoolsCombobox />
      </div>
      <div className="hidden h-14 w-full items-center justify-between p-8 md:flex">
        <HeaderLinks />
        <HeaderActions />
      </div>
    </header>
  );
}
