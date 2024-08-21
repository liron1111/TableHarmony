export default function PrivateLayout({
  children,
  header,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
}) {
  return (
    <>
      {header}
      <main className="mb-10 flex-1">{children}</main>
    </>
  );
}
