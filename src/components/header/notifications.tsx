"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BellIcon } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";

export function Notifications() {
  const [isOpen, setIsOpen] = useState(false);

  const notifications = [];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="notifications"
        >
          <BellIcon className="size-4" />
          {notifications.length > 0 && (
            <span className="absolute right-[1px] top-1 size-2 rounded-full bg-blue-500" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="grid space-y-4 md:w-96" align="end">
        <div className="flex items-center justify-between text-sm font-semibold">
          Notifications{" "}
          {/*TODO: Create notifications page - or notifications popover like in vercel*/}
          <Link
            href="#"
            onClick={() => setIsOpen(false)}
            className="text-xs text-primary"
          >
            View all
          </Link>
        </div>
        <Separator />
        <div className="grid text-sm text-muted-foreground">
          {notifications.length === 0 && (
            <div className="m-1 flex items-center justify-center text-xs">
              No unread notifications
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
