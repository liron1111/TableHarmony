import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/page-header";
import { CreateSchoolSheet } from "./_components/create-school-sheet";
import { SchoolList } from "./_components/school-list";
import { SearchForm } from "../../../components/search-form";

import { createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
  title: "Schools",
  description: "Manage your schools.",
});

export default function SchoolsPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const searchQuery = searchParams?.query || "";

  return (
    <div className="container pb-8">
      <PageHeader>
        <PageHeaderHeading>Schools</PageHeaderHeading>
        <PageActions className="flex w-full flex-row">
          <SearchForm />
          <CreateSchoolSheet />
        </PageActions>
      </PageHeader>
      <SchoolList searchQuery={searchQuery} />
    </div>
  );
}
