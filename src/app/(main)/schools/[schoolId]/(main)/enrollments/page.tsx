import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { EnrollmentsDataTable } from "./_components/data-table/enrollments-data-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  description: "View and manage school's enrolls.",
};

export default function EnrollmentsPage() {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Enrollments</PageHeaderHeading>
      </PageHeader>
      <EnrollmentsDataTable />
    </div>
  );
}
