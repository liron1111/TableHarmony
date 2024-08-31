import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { SettingsTabs } from "./_components/tabs-section";

export default function SettingsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { schoolId: string };
}) {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>School settings</PageHeaderHeading>
        <PageHeaderDescription>
          Manage your school&apos;s settings and set preferences.
        </PageHeaderDescription>
        <PageActions>
          <SettingsTabs />
        </PageActions>
      </PageHeader>
      {children}
    </div>
  );
}
