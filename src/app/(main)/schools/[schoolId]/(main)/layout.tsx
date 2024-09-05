import { SchoolSidebar } from "./_components/sidebar";

export default function MainSchoolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SchoolSidebar />
      <div className="relative w-full overflow-x-auto">
        <div className="overflow-auto md:h-[calc(100vh-65px)]">
          <div className="relative mx-auto w-full pb-4 pl-0 pr-4 md:pl-4 md:pr-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
