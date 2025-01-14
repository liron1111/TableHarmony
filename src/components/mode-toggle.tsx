"use client";

import { SunIcon, MoonIcon, LaptopIcon } from "lucide-react";

import { Theme, cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function ModeToggle({ variant }: { variant?: "default" | "button" }) {
  const { theme, setTheme } = useTheme();

  if (variant === "button")
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <SunIcon className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setTheme("light")}
          >
            Light
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setTheme("dark")}
          >
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setTheme("system")}
          >
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

  return (
    <div className="flex items-center space-x-2 rounded-full border p-1">
      <button
        onClick={() => setTheme(Theme.LIGHT)}
        className={cn("rounded-full p-1.5", theme === "light" && "bg-muted")}
      >
        <span className="sr-only">light</span>

        <SunIcon className="h-4 w-4" />
      </button>
      <button
        onClick={() => setTheme(Theme.SYSTEM)}
        className={cn("rounded-full p-1.5", theme === "system" && "bg-muted")}
      >
        <span className="sr-only">system</span>
        <LaptopIcon className="h-4 w-4" />
      </button>
      <button
        onClick={() => setTheme(Theme.DARK)}
        className={cn("rounded-full p-1.5", theme === "dark" && "bg-muted")}
      >
        <span className="sr-only">dark</span>
        <MoonIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
