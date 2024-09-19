import { PageHeader, PageHeaderHeading } from "@/components/page-header";

import { EventsIntegrationSheet } from "./_components/events-integration";
import { SchoolIntegrationSheet } from "./_components/school-integration-sheet";
import Image from "next/image";
import { cardStyles } from "@/styles/common";

export default function DocsPage() {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Documentation</PageHeaderHeading>
      </PageHeader>
      <div className={cardStyles}>
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-balance text-lg font-semibold md:text-xl">
            Integrate Your School Seamlessly
          </span>
          <p className="text-balance text-muted-foreground">
            Our step-by-step guides make integration a breeze.
          </p>
        </div>
        <Image
          src="/assets/events.svg"
          alt="School Integration Process"
          width={300}
          height={200}
        />
        <div className="flex flex-col-reverse gap-2 md:flex-row">
          <SchoolIntegrationSheet />
          <EventsIntegrationSheet />
        </div>
      </div>
    </div>
  );
}
