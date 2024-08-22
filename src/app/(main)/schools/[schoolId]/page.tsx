import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { ComingSoon } from "@/components/coming-soon";

export default function SchoolsPage({
  params,
}: {
  params: { schoolId: string };
}) {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>School</PageHeaderHeading>
      </PageHeader>
      <ComingSoon />
    </div>
  );
}
