import { ComingSoon } from "@/components/coming-soon";
import { CommentList } from "./_components/comments/list";

export default function AssignmentPage() {
  return (
    <div className="container space-y-10">
      <ComingSoon />
      <CommentList />
    </div>
  );
}
