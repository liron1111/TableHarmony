import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { MembershipDataTable } from "./_components/data-table/membership-data-table";
import { TypeTabs } from "./_components/tabs-section";

export default function SchoolMembershipsPage({
  searchParams,
}: {
  searchParams: { type: "table" | "board" };
}) {
  const type = searchParams.type || "table";

  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Memberships</PageHeaderHeading>
        <PageHeaderDescription>
          View and manage the school&apos;s members.
        </PageHeaderDescription>
        <PageActions>
          <TypeTabs />
        </PageActions>
      </PageHeader>
      {type === "table" && <MembershipDataTable />}
    </div>
  );
}
