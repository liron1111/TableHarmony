import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/page-header";
import { CreateSchoolSheet } from "./_components/create-school-sheet";
import { SchoolList } from "./_components/school-list";
import { SearchForm } from "./_components/search-form";

export default function SchoolsPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;

  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Schools</PageHeaderHeading>
        <PageActions className="w-full">
          <SearchForm />
          <CreateSchoolSheet />
        </PageActions>
      </PageHeader>
      <SchoolList query={query} page={page} />
    </div>
  );
}
