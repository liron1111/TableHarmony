import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/page-header";
import { SearchForm } from "@/components/search-form";

import { CreateCourseSheet } from "./_components/create-course-sheet";
import { CourseList } from "./_components/course-list";

export default function CoursesPage() {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Courses</PageHeaderHeading>
        <PageActions className="flex w-full flex-row">
          <SearchForm />
          <CreateCourseSheet />
        </PageActions>
      </PageHeader>
      <CourseList />
    </div>
  );
}
