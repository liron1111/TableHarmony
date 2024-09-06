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
      <PageHeader className="px-2 py-4 md:py-6 md:pb-4 lg:py-10">
        <PageHeaderHeading className="text-2xl font-semibold md:text-3xl">
          Memberships
        </PageHeaderHeading>
        <PageHeaderDescription>
          View and manage course members
        </PageHeaderDescription>
      </PageHeader>
      <MembershipDataTable />
    </div>
  );
}
