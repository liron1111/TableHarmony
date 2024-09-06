import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { EnrollmentsDataTable } from "./_components/data-table/enrollments-data-table";

export default function EnrollmentsPage() {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Enrollments</PageHeaderHeading>
        <PageHeaderDescription>
          View and manage course enrollments
        </PageHeaderDescription>
      </PageHeader>
      <EnrollmentsDataTable />
    </div>
  );
}
