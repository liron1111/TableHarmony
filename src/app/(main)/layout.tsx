import { SiteHeader } from "@/components/header";
import { MainLinks } from "./schools/links";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader links={<MainLinks />} />
      <main className="flex-1">{children}</main>
    </>
  );
}
