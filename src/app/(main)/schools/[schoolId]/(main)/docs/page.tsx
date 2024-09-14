import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/page-header";

import { EventsIntegrationSheet } from "./_components/events-integration";
import { SchoolIntegrationSheet } from "./_components/school-integration-sheet";

export default function DocsPage() {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Docs</PageHeaderHeading>
        <PageActions>
          <EventsIntegrationSheet />
          <SchoolIntegrationSheet />
        </PageActions>
      </PageHeader>
    </div>
  );
}
