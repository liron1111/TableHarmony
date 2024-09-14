import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { EventsChart } from "./_charts/events";
import { MembershipDistributionChart } from "./_charts/membership-distribution";
import { ClassesChart } from "./_charts/classes";

export default function AnalyticsPage() {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Analytics</PageHeaderHeading>
      </PageHeader>
      <div className="space-y-10">
        <EventsChart />
        <div className="flex flex-col gap-10 md:flex-row">
          <MembershipDistributionChart />
          <ClassesChart />
        </div>
      </div>
    </div>
  );
}
