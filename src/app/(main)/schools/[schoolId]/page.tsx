import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { SchoolsCombobox } from "./schools-combobox";
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
        <PageActions>
          <SchoolsCombobox schoolId={params.schoolId} />
        </PageActions>
      </PageHeader>
      <ComingSoon />
    </div>
  );
}
