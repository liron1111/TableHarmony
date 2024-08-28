import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { MembershipDataTable } from "./_components/data-table/membership-data-table";

export default function MembershipsPage() {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Memberships</PageHeaderHeading>
        <PageHeaderDescription>
          View and manage the school&apos;s members.
        </PageHeaderDescription>
      </PageHeader>
      <MembershipDataTable />
    </div>
  );
}
