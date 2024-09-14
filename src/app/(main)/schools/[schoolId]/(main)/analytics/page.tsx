import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { EventsChart } from "./events-chart";
import { MembershipDistributionChart } from "./membership-distribution";

export default function AnalyticsPage() {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Analytics</PageHeaderHeading>
      </PageHeader>
      <div className="space-y-10">
        <EventsChart />
        <MembershipDistributionChart />
      </div>
    </div>
  );
}
