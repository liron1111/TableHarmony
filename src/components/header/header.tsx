import { SignedOut } from "@clerk/nextjs";
import { HeaderActions } from "./header-actions";
import { HeaderLinks } from "./header-links";
import { Button } from "../ui/button";
import Link from "next/link";
import { Logo } from "../logo";

export async function SiteHeader({ links }: { links?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <SignedOut>
          <Logo />
        </SignedOut>
        <SignedOut>
          <Button asChild>
            <Link href="/sign-in">Get started</Link>
          </Button>
        </SignedOut>
        {/** Delete this signed out */}
        <HeaderLinks links={links} />
        <HeaderActions />
      </div>
    </header>
  );
}
