import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/page-header";

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
        <PageActions className="w-full"></PageActions>
      </PageHeader>
    </div>
  );
}
