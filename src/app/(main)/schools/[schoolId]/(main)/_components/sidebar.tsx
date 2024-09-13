"use client";

import useMediaQuery from "@/hooks/use-media-query";
import { useSchool } from "@/app/(main)/schools/[schoolId]/_components/providers/school-provider";
import { useMembership } from "@/app/(main)/schools/[schoolId]/_components/providers/membership-provider";
import { useParams, usePathname } from "next/navigation";

import {
  AlignLeftIcon,
  CalendarIcon,
  ClipboardIcon,
  HomeIcon,
  SchoolIcon,
  SettingsIcon,
  UserIcon,
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

  if (isMobile) return;

  return (
    <div className="h-[calc(100vh-65px)]">
      <SideNav NavItems={NavItems} />
    </div>
  );
}

export const NavItems = () => {
  const { schoolId } = useParams();
  const { membership } = useMembership();
  const pathname = usePathname();

  function isNavItemActive(nav: string) {
    return pathname.endsWith(nav);
  }

  function schoolPath(path: string) {
    return `/schools/${schoolId}${path}`;
  }

  const navItems: NavItem[] = [
    {
      name: "Overview",
      href: schoolPath("/"),
      icon: <HomeIcon className="size-5" />,
      active: isNavItemActive(schoolPath("")),
      position: "top",
    },
  ];

  if (!membership) return navItems;

  navItems.push({
    name: "Profile",
    href: schoolPath(`/members/${membership?.userId}`),
    icon: <UserIcon className="size-5" />,
    active: pathname.includes(`/members/${membership?.userId}`),
    position: "top",
  });
  navItems.push({
    name: "Courses",
    href: schoolPath("/courses"),
    icon: <SchoolIcon className="size-5" />,
    active: isNavItemActive("/courses") && !pathname.includes("members"),
    position: "top",
  });
  navItems.push({
    name: "Semesters",
    href: schoolPath("/semesters"),
    icon: <CalendarIcon className="size-5" />,
    active: isNavItemActive("/semesters"),
    position: "top",
  });

  if (membership.role === "manager") {
    navItems.push(
      ...[
        {
          name: "Enrollments",
          href: schoolPath("/enrollments"),
          icon: <ClipboardIcon className="size-5" />,
          active: isNavItemActive("/enrollments"),
          position: "bottom",
        },
        {
          name: "Memberships",
          href: schoolPath("/memberships"),
          icon: <UsersIcon className="size-5" />,
          active: isNavItemActive("/memberships"),
          position: "bottom",
        },
        {
          name: "Settings",
          href: schoolPath("/school-settings"),
          icon: <SettingsIcon className="size-5" />,
          active: pathname.includes("/school-settings"),
          position: "bottom",
        },
      ]
    );
  }

  return navItems;
};

export function SchoolSidebarMobile() {
  const { school } = useSchool();
  const [showSheet, setShowSheet] = useState(false);
  const { isMobile } = useMediaQuery();
  const navItems = NavItems();

  if (!isMobile) return;

  return (
    <Sheet open={showSheet} onOpenChange={setShowSheet}>
      <SheetTrigger>
        <Button size="icon" variant="ghost" aria-label="Open sidebar">
          <AlignLeftIcon className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
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
