"use client";

import { Button } from "@/components/ui/button";
import { SettingsIcon } from "lucide-react";
import { useContext } from "react";
import { SchoolContext } from "./school-context";
import Image from "next/image";
import Link from "next/link";

export function Sidebar() {
  const { school } = useContext(SchoolContext);
  //TODO: fix this mess
  return (
    <div className="relative hidden h-full w-[200px] transform flex-col bg-muted/20 transition-all duration-300 ease-in-out md:flex">
      <div className="sticky inset-x-0 top-0 hidden md:flex">
        <div className="dark:border-gray-dark sticky bottom-0 top-0 w-[360px] md:h-[calc(100vh-57px)] md:overflow-y-auto md:border-r">
          <div className="flex flex-col px-3 py-2 pt-6">
            <div className="flex flex-col items-center gap-2">
              <Image src={school.image} alt="school" width="40" height="40" />
              <span className="text-lg font-semibold">{school.name}</span>
            </div>
            <div className="mt-4">
              <Button
                variant="ghost"
                className="flex items-center gap-2"
                asChild
              >
                <Link href={`/schools/${school._id}/school-settings`}>
                  <SettingsIcon className="size-4" />
                  School settings
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
