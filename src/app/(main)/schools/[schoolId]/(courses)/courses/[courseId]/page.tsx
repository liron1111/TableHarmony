import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { CourseInfo } from "./_components/course-info";

export default function CoursePage() {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Info</PageHeaderHeading>
      </PageHeader>
      <CourseInfo />
    </div>
  );
}
