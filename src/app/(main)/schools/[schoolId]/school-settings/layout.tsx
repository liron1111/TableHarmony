import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { SettingsTabs } from "./_components/tabs-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  description: "Manage your school's settings and set preferences.",
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
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
