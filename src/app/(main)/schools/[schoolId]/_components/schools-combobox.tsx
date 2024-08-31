"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";

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
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useMediaQuery from "@/hooks/use-media-query";
import { useSchool } from "./school-context";

const School = ({ name, image }: { name: string; image: string }) => (
  <div className="flex items-center gap-2">
    <div className="relative size-5">
      <Image
        alt={`${name} logo`}
        src={image}
        layout="fill"
        objectFit="cover"
        className="rounded-full"
      />
    </div>
    <span className="max-w-[150px] truncate font-medium">{name}</span>
  </div>
);

export function SchoolsCombobox() {
  const { school: selectedSchool } = useSchool();

  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(selectedSchool?._id as string);
  const [query, setQuery] = React.useState("");
  const { isMobile } = useMediaQuery();

  const schools = useQuery(api.schools.getUserSchools);

  if (!schools) return <Skeleton className="h-6 w-full md:w-28" />;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {!isMobile ? (
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className="w-fit justify-between"
          >
            {!selectedSchool ? (
              "schools"
            ) : (
              <School name={selectedSchool.name} image={selectedSchool.image} />
            )}
            <ChevronsUpDown className="ml-4 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        ) : (
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {!selectedSchool ? (
              "Schools"
            ) : (
              <School name={selectedSchool.name} image={selectedSchool.image} />
            )}
            <ChevronsUpDown className="ml-4 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="max-w-72 p-0">
        <Command>
          <CommandInput
            value={query}
            onValueChange={setQuery}
            placeholder="Search schools..."
          />
          <CommandList>
            <CommandEmpty>No school found.</CommandEmpty>
            <CommandGroup>
              {schools.map((school) => (
                <CommandItem
                  key={school._id}
                  value={school.name}
                  onSelect={(currentValue: string) => {
                    setValue(currentValue);
                    setOpen(false);
                    router.push(`/schools/${school._id}`);
                  }}
                  className="cursor-pointer p-2"
                >
                  <School name={school.name} image={school.image} />

                  <Check
                    className={cn(
                      "ml-auto size-4",
                      selectedSchool?._id === school._id
                        ? "opacity-100"
                        : "opacity-0"
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
