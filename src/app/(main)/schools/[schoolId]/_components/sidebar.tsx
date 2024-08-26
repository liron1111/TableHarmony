"use client";

import { Button } from "@/components/ui/button";

import { useContext } from "react";
import { SchoolContext } from "./school-context";

import Link from "next/link";
import { ExitSchoolDialog } from "./exit-school-dialog";
import Image from "next/image";

export function Sidebar() {
  const { school, role } = useContext(SchoolContext);
  //TODO: fix this mess
  return (
    <div className="relative hidden h-full w-[200px] transform flex-col bg-neutral-50/10 transition-all duration-300 ease-in-out dark:bg-background md:flex">
      <div className="sticky inset-x-0 top-0 hidden md:flex">
        <div className="dark:border-gray-dark sticky bottom-0 top-0 w-[360px] md:h-[calc(100vh-65px)] md:overflow-y-auto md:border-r">
          <div className="flex h-full w-full columns-1 flex-col overflow-x-hidden break-words p-4">
            <div className="flex flex-col items-center space-y-2">
              <Image
                src={school.image}
                alt={school.name}
                width={75}
                height={75}
                className="rounded-md"
              />
              <Link href={`/schools/${school._id}`} className="font-medium">
                {school.name}
              </Link>
            </div>
            {role === "manager" && (
              <div className="mt-10 space-y-1">
                <span className="mb-4 font-medium tracking-tight text-muted-foreground">
                  Manager
                </span>
                <Button
                  variant="ghost"
                  className="flex w-full justify-start"
                  asChild
                >
                  <Link href={`/schools/${school._id}/school-settings`}>
                    School settings
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="flex w-full justify-start"
                  asChild
                >
                  <Link href={`/schools/${school._id}/enrollments`}>
                    Enrollments
                  </Link>
                </Button>
              </div>
            )}

            {(role === "teacher" || role === "student") && (
              <div className="mt-10 flex flex-col space-y-1">
                <span className="mb-4 font-medium tracking-tight text-muted-foreground">
                  Options
                </span>
                <ExitSchoolDialog />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
