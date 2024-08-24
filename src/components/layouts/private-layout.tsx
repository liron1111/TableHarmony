import { PrivateHeader } from "@/components/headers";

export default function PrivateLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <>
      <PrivateHeader />
      <main className="flex-1 bg-muted/20 pb-10">{children}</main>
    </>
  );
}
