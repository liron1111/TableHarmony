import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/page-header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center">
      <PageHeader variant="center">
        <PageHeaderHeading>
          Uhoh, this route wasn&apos;t found
        </PageHeaderHeading>
        <PageActions>
          <Button size="lg" asChild>
            <Link href="/">Back home</Link>
          </Button>
        </PageActions>
      </PageHeader>

      <Image
        src="/assets/not-found.svg"
        width="300"
        height="300"
        alt="not found"
      />
    </div>
  );
}
