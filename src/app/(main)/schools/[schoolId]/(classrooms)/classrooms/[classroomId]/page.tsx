import { ClassroomMembersDataTable } from "./_components/data-table/classroom-members-data-table";
import { ClassroomHeader } from "./classroom-header";

export default function ClassroomPage() {
  return (
    <div className="container">
      <ClassroomHeader />
      <ClassroomMembersDataTable />
    </div>
  );
}
