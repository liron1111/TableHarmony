import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { SettingsTabs } from "./_components/tabs-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  description: "Manage classroom settings and set preferences.",
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Classroom settings</PageHeaderHeading>
        <PageHeaderDescription>
          Manage classroom settings and set preferences.
        </PageHeaderDescription>
        <PageActions>
          <SettingsTabs />
        </PageActions>
      </PageHeader>
      {children}
    </div>
  );
}
