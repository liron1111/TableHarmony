import { Logo } from "@/components/logo";
import { MenuButton } from "./menu-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between gap-2">
        <Logo />

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="linkHover" asChild>
            <Link href="/changelog">Changelog</Link>
          </Button>
          <Button variant="linkHover" asChild>
            <Link href="/contact">Contact</Link>
          </Button>
        </div>

        <MenuButton />
      </div>
    </header>
  );
}
