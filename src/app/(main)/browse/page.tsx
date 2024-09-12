import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/page-header";

import { createMetadata } from "@/utils/metadata";
import { SearchForm } from "../../../components/search-form";

import { PublicSchoolList } from "./public-school-list";

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
    <div className="container pb-8">
      <PageHeader>
        <PageHeaderHeading>Browse</PageHeaderHeading>
        <PageActions className="flex w-full flex-row">
          <SearchForm />
        </PageActions>
      </PageHeader>
      <PublicSchoolList searchQuery={searchQuery} />
    </div>
  );
}
