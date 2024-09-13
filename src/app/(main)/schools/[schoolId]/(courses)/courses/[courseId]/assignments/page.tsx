import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/page-header";
import { CreateAssignmentSheet } from "./_components/create-assignment-sheet";
import { AssignmentsList } from "./_components/assignments-list";

export default function AssignmentsPage() {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Assignments</PageHeaderHeading>
        <PageActions>
          <CreateAssignmentSheet />
        </PageActions>
      </PageHeader>
      <AssignmentsList />
    </div>
  );
}
