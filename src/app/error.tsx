"use client";

import { shapeErrors } from "@/utils/errors";

import { Button } from "@/components/ui/button";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import Image from "next/image";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  //TODO: display public errors
  return (
    <div className="container flex flex-col items-center">
      <PageHeader variant="center">
        <PageHeaderHeading>Oops! Something went wrong</PageHeaderHeading>
        <PageHeaderDescription>
          {shapeErrors({ error }).message}
        </PageHeaderDescription>
        <PageActions>
          <Button size="lg" variant="outline" asChild>
            <Link href="/">Back home</Link>
          </Button>
          <Button onClick={reset} size="lg">
            Try again!
          </Button>
        </PageActions>
      </PageHeader>
      <Image
        src="/assets/fixing-bugs.svg"
        alt="error"
        width="300"
        height="300"
      />
    </div>
  );
}
