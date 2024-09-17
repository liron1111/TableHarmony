"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? siteConfig.url
    : "http://localhost:3000";

export function EventsIntegrationSheet() {
  const { schoolId } = useParams();
  const code = `await fetch("${BASE_URL}/api/events", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
      key: "User hit landing page", // any custom event you want to track
      objectId: "${schoolId}",
    }),
  });`;

  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }, [isCopied]);

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="secondary">Events Integration</Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Events Integration Guide</SheetTitle>
          <SheetDescription>
            You can post events to our api using the following endpoint:
          </SheetDescription>
        </SheetHeader>
        <Card className="mt-4">
          <CardHeader className="flex flex-row items-center justify-end border-b p-2">
            <Button
              variant="outline"
              size="icon"
              aria-label="copy"
              onClick={() => {
                navigator.clipboard.writeText(code);
                setIsCopied(true);
              }}
            >
              {isCopied ? (
                <CheckIcon className="size-4" />
              ) : (
                <CopyIcon className="size-4" />
              )}
            </Button>
          </CardHeader>
          <pre className="mt-2 w-full overflow-x-auto p-2">
            <code className="language-javascript">{code}</code>
          </pre>
        </Card>
      </SheetContent>
    </Sheet>
  );
}
