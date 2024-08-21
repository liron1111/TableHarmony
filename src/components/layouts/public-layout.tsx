import { SiteFooter } from "@/components/site-footer";
import { PublicHeader } from "@/components/headers";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PublicHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </>
  );
}
