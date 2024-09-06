import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { MembershipDataTable } from "./_components/data-table/membership-data-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  description: "View and manage course members.",
};

export default function MembershipsPage() {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Memberships</PageHeaderHeading>
        <PageHeaderDescription>
          View and manage course members
        </PageHeaderDescription>
      </PageHeader>
      <MembershipDataTable />
    </div>
  );
}
