import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/page-header";

import { createMetadata } from "@/utils/metadata";
import { ClassroomList } from "./_components/classroom-list";
import { SearchForm } from "../../../_components/search-form";
import { CreateClassroomSheet } from "./_components/create-classroom-sheet";

export const metadata = createMetadata({
  title: "Classrooms",
  description: "Explore available classrooms.",
});

export default function ClassroomsPage() {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Classrooms</PageHeaderHeading>
        <PageActions className="flex w-full flex-row">
          <SearchForm />
          <CreateClassroomSheet />
        </PageActions>
      </PageHeader>
      <ClassroomList />
    </div>
  );
}
