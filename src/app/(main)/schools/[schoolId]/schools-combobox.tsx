"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function SchoolsCombobox({ schoolId }: { schoolId: string }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(schoolId);
  const router = useRouter();

  const schools = useQuery(api.schools.getUserSchools);

  if (!schools) return <Skeleton className="h-6 w-28" />;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-fit justify-between"
        >
          {!value ? (
            "Select schools..."
          ) : (
            <div className="flex items-center gap-2">
              <Image
                alt="school image"
                src={
                  schools.find((schools) => schools._id === value)?.image ?? ""
                }
                width="20"
                height="20"
              />
              {schools.find((schools) => schools._id === value)?.name}
            </div>
          )}
          <ChevronsUpDown className="ml-4 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-72 p-0">
        <Command>
          <CommandInput placeholder="Search schools..." />
          <CommandList>
            <CommandEmpty>No school found.</CommandEmpty>
            <CommandGroup>
              {schools.map((school) => (
                <CommandItem
                  key={school._id}
                  value={school._id}
                  onSelect={(currentValue: string) => {
                    setValue(currentValue);
                    setOpen(false);
                    router.push(currentValue);
                  }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      alt="school image"
                      src={school.image}
                      width="20"
                      height="20"
                    />
                    {school.name}
                  </div>

                  <Check
                    className={cn(
                      "size-4",
                      value === school._id ? "block" : "hidden"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
