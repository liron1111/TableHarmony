import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { ComingSoon } from "@/components/coming-soon";

export default function SchoolsSettingsPage() {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>School settings</PageHeaderHeading>
      </PageHeader>
      <ComingSoon />
    </div>
  );
}
