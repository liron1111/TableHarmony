"use client";

import useMediaQuery from "@/hooks/use-media-query";
import { useSchool } from "@/app/(main)/schools/[schoolId]/_components/providers/school-provider";
import { useMembership } from "@/app/(main)/schools/[schoolId]/_components/providers/membership-provider";
import { usePathname } from "next/navigation";

import {
  AlignLeftIcon,
  ClipboardIcon,
  EllipsisVerticalIcon,
  HomeIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import SideNav, { NavItem } from "@/components/side-nav";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";

export function SchoolSidebar() {
  const { isMobile } = useMediaQuery();

  if (isMobile) return null;

  return (
    <div className="h-[calc(100vh-65px)]">
      <SideNav NavItems={NavItems} />
    </div>
  );
}

export const NavItems = () => {
  const { school } = useSchool();
  const { membership } = useMembership();
  const pathname = usePathname();

  function isNavItemActive(pathname: string, nav: string) {
    return pathname.includes(nav);
  }

  function schoolPath(path: string) {
    return `/schools/${school?._id}${path ? `/${path}` : ""}`;
  }

  const navItems: NavItem[] = [];

  navItems.push({
    name: "Overview",
    href: schoolPath("/"),
    icon: <HomeIcon className="size-5" />,
    active: pathname === schoolPath(""),
    position: "top",
  });

  if (membership?.role === "manager") {
    navItems.push({
      name: "Enrollments",
      href: schoolPath("enrollments"),
      icon: <ClipboardIcon className="size-5" />,
      active: isNavItemActive(pathname, "/enrollments"),
      position: "bottom",
    });

    navItems.push({
      name: "Memberships",
      href: schoolPath("memberships"),
      icon: <UsersIcon className="size-5" />,
      active: isNavItemActive(pathname, "/memberships"),
      position: "bottom",
    });

    navItems.push({
      name: "Settings",
      href: schoolPath("school-settings"),
      icon: <SettingsIcon className="size-5" />,
      active: isNavItemActive(pathname, "/school-settings"),
      position: "bottom",
    });
  }

  return navItems;
};

export function SchoolSidebarMobile() {
  const { school } = useSchool();
  const [showSheet, setShowSheet] = useState(false);
  const { isMobile } = useMediaQuery();
  const navItems = NavItems();

  if (!isMobile) return null;

  return (
    <Sheet open={showSheet} onOpenChange={setShowSheet}>
      <SheetTrigger>
        <Button size="icon" variant="ghost" aria-label="Open sidebar">
          <AlignLeftIcon className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="truncate">{school?.name}</SheetTitle>
          <SheetDescription className="truncate">
            {school?.description}
          </SheetDescription>
        </SheetHeader>
        <nav className="mt-4 flex flex-col space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant={item.active ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => setShowSheet(false)}
              asChild
            >
              <Link href={item.href}>
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </Link>
            </Button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
