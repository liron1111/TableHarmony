import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/page-header";
import { CreateEventSheet } from "./_components/create-event-sheet";
import { EventsList } from "./_components/events-list";

export default function EventsPage() {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Events</PageHeaderHeading>
        <PageActions>
          <CreateEventSheet />
        </PageActions>
      </PageHeader>
      <EventsList />
    </div>
  );
}
