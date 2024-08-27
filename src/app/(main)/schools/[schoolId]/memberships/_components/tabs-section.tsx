"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SquareKanbanIcon, Table2Icon } from "lucide-react";

export function TypeTabs() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const currentTab = searchParams.get("type") || "table";

  function createSearchQuery(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("type", term.toString());
    } else {
      params.delete("type");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Tabs
      value={currentTab}
      defaultValue={currentTab}
      onValueChange={createSearchQuery}
    >
      <TabsList className="space-x-2">
        <TabsTrigger value="table">
          <span className="sr-only">Table</span>
          <Table2Icon className="size-4" />
        </TabsTrigger>
        <TabsTrigger value="board">
          <span className="sr-only">Board</span>
          <SquareKanbanIcon className="size-4" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
