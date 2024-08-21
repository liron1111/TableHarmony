import { SchoolsCombobox } from "@/app/(main)/schools/[schoolId]/schools-combobox";
import { PrivateHeader } from "@/components/headers";

export default function Header({ params }: { params: { schoolId: string } }) {
  return (
    <PrivateHeader links={<SchoolsCombobox schoolId={params.schoolId} />} />
  );
}
