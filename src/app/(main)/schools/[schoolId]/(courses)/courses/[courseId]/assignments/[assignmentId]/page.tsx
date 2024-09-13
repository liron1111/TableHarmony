import { CommentList } from "./_components/comments/list";
import { SubmissionsDataTable } from "./_components/data-table/submissions";

export default function AssignmentPage() {
  return (
    <div className="container space-y-20">
      <SubmissionsDataTable />
      <CommentList />
    </div>
  );
}
