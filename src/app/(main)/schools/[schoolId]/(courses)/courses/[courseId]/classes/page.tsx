import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/page-header";
import { ClassesSchedule } from "./_components/classes-schedule";
import { CreateClassSheet } from "./_components/create-class-sheet";

export default function ClassesPage() {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Classes</PageHeaderHeading>
        <PageActions>
          <CreateClassSheet />
        </PageActions>
      </PageHeader>
      <ClassesSchedule />
    </div>
  );
}
