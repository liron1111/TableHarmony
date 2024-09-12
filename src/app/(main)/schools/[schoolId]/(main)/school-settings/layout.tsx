import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/page-header";
import { SettingsTabs } from "./_components/tabs-section";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>School settings</PageHeaderHeading>
        <PageActions>
          <SettingsTabs />
        </PageActions>
      </PageHeader>
      {children}
    </div>
  );
}
