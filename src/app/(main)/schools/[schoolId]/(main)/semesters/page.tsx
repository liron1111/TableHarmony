import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/page-header";
import { CreateSemesterSheet } from "./_components/create-semester-sheet";
import { SemesterList } from "./_components/semester-list";

export default function SemestersPage() {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Semesters</PageHeaderHeading>
        <PageActions>
          <CreateSemesterSheet />
        </PageActions>
      </PageHeader>
      <SemesterList />
    </div>
  );
}
