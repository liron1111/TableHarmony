import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/page-header";
import { ComingSoon } from "@/components/coming-soon";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SchoolsPage({
  params,
}: {
  params: { schoolId: string };
}) {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>School</PageHeaderHeading>
        <PageActions>
          <Button asChild>
            <Link href={`/schools/${params.schoolId}/school-settings`}>
              School settings
            </Link>
          </Button>
        </PageActions>
      </PageHeader>
      <ComingSoon />
    </div>
  );
}
