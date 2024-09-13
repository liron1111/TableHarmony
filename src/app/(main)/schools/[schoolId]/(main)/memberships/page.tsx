import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { MembershipDataTable } from "./_components/data-table/membership-data-table";
import { MembershipDistributionChart } from "./_components/charts/membership-distribution";

export default function MembershipsPage() {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Memberships</PageHeaderHeading>
      </PageHeader>
      <MembershipDataTable />
      <MembershipDistributionChart />
    </div>
  );
}
