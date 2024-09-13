import { AssignmentHeader } from "./_components/assignment-header";
import { AssignmentProvider } from "./_components/assignment-provider";

export default function AssignmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AssignmentProvider>
      <AssignmentHeader />
      {children}
    </AssignmentProvider>
  );
}
