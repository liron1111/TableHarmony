import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/page-header";
import { CreateEventSheet } from "./_components/create-event-sheet";

export default function EventsPage() {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Events</PageHeaderHeading>
        <PageActions>
          <CreateEventSheet />
        </PageActions>
      </PageHeader>
    </div>
  );
}
