import { SchoolSidebar } from "../(main)/_components/sidebar";

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SchoolSidebar />
      <div className="relative w-full overflow-x-auto">
        <div className="overflow-auto md:h-[calc(100vh-65px)]">
          <div className="relative mx-auto w-full pb-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
