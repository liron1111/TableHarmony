import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { EventsChart } from "./events-chart";

export default function AnalyticsPage() {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Analytics</PageHeaderHeading>
      </PageHeader>
      <EventsChart />
    </div>
  );
}
