"use client";

import { AUTHENTICATION_ERROR_MESSAGE } from "@/utils/errors";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import Image from "next/image";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isAuthenticationError = error.message.includes(
    AUTHENTICATION_ERROR_MESSAGE
  );

  const isDev = process.env.NODE_ENV === "development";

  return (
    <div className="container flex flex-col items-center">
      {isAuthenticationError ? (
        <>
          <PageHeader variant="center">
            <PageHeaderHeading>
              Oops! You Need to Be Logged In
            </PageHeaderHeading>
            <PageHeaderDescription>
              To access this page, please log in first.
            </PageHeaderDescription>
            <PageActions>
              <Button asChild>
                <Link href="/sign-in">Sign in</Link>
              </Button>
            </PageActions>
          </PageHeader>
          <Image
            src="/assets/fixing-bugs.svg"
            alt="error"
            width="300"
            height="300"
          />
        </>
      ) : (
        <>
          <PageHeader variant="center">
            <PageHeaderHeading>Oops! Something went wrong</PageHeaderHeading>
            {isDev && (
              <PageHeaderDescription>{error.message}</PageHeaderDescription>
            )}
            <PageActions>
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
        </>
      )}
    </div>
  );
}
