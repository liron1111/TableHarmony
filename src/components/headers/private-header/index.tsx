import { HeaderActions } from "./header-actions";
import { HeaderLinks } from "./header-links";

export function PrivateHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <HeaderLinks />
        <HeaderActions />
      </div>
    </header>
  );
}
