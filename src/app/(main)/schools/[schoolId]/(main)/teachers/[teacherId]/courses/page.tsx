import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { CourseList } from "./course-list";

export default function TeacherCoursesPage() {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Courses</PageHeaderHeading>
      </PageHeader>
      <CourseList />
    </div>
  );
}
