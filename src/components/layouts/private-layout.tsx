import { PrivateHeader } from "@/components/headers";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PrivateHeader />
      <main className="mb-10 flex-1">{children}</main>
    </>
  );
}
