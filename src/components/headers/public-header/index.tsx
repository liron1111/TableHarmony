import { Logo } from "@/components/logo";
import { MenuButton } from "./menu-button";

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Logo />

        <MenuButton />
      </div>
    </header>
  );
}
