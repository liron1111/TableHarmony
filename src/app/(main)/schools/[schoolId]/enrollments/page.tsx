import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { EnrollmentsSortable } from "./enrollments-sortable";

export default function EnrollmentsPage() {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Enrollments</PageHeaderHeading>
      </PageHeader>
      <EnrollmentsSortable />
    </div>
  );
}
