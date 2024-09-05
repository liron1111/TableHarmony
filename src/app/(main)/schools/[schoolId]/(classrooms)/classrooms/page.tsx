import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/page-header";

import { ClassroomList } from "./_components/classroom-list";
import { SearchForm } from "../../../_components/search-form";
import { CreateClassroomSheet } from "./_components/create-classroom-sheet";
import { Metadata } from "next";

export const metadata: Metadata = {
  description: "view this school's classrooms",
};

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
