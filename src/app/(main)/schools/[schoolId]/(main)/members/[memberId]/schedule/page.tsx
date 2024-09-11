import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { Schedule } from "./schedule";

export default function SchedulePage() {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Schedule</PageHeaderHeading>
      </PageHeader>
      <Schedule />
    </div>
  );
}
