import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/page-header";
import { CreateSchoolSheet } from "./_components/create-school-sheet";
import { SchoolList } from "./_components/school-list";

export default function SchoolsPage() {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Schools</PageHeaderHeading>
        <PageActions>
          <CreateSchoolSheet />
        </PageActions>
      </PageHeader>
      <SchoolList />
    </div>
  );
}
