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
      <main className="mb-10 flex-1">{children}</main>
    </>
  );
}
