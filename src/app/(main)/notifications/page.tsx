import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { Notifications } from "./notifications";

export default function NotificationsPage() {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Notifications</PageHeaderHeading>
      </PageHeader>
      <Notifications />
    </div>
  );
}
