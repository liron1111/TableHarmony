import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

import { createMetadata } from "@/utils/metadata";
import { SearchForm } from "../schools/_components/search-form";

import { PubliSchoolListWrapper } from "./public-school-list-wrapper";

export const metadata = createMetadata({
  title: "Browse",
  description: "Explore publicly available schools.",
});

export default function BrowsePage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const searchQuery = searchParams?.query || "";

  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Browse</PageHeaderHeading>
        <PageHeaderDescription>
          Explore publicly available schools.
        </PageHeaderDescription>
        <PageActions className="flex w-full flex-row">
          <SearchForm />
        </PageActions>
      </PageHeader>
      <PubliSchoolListWrapper searchQuery={searchQuery} />
    </div>
  );
}