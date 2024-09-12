import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { createMetadata } from "@/utils/metadata";

import { NotificationsDataTable } from "./_data-table/notifications-data-table";

export const metadata = createMetadata({
  title: "Notifications",
  description: "Manage your notifications.",
});

export default function NotificationsPage() {
  return (
    <div className="container pb-8">
      <PageHeader>
        <PageHeaderHeading>Notifications</PageHeaderHeading>
        <PageHeaderDescription>
          Manage your notifications.
        </PageHeaderDescription>
      </PageHeader>
      <NotificationsDataTable />
    </div>
  );
}
