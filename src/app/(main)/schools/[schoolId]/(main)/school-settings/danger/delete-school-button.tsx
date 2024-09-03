"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { DeleteSchoolDialog } from "@/app/(main)/schools/_components/delete-school-dialog";
import { useSchool } from "@/app/(main)/schools/[schoolId]/_components/providers/school-provider";
import { useMembership } from "@/app/(main)/schools/[schoolId]/_components/providers/membership-provider";

export function DeleteSchoolButton() {
  const [open, setOpen] = useState(false);
  const { school } = useSchool();
  const { membership } = useMembership();

  if (!school || membership?.role !== "manager") return null;

  return (
    <>
      <Button
        className="w-full md:w-fit"
        variant="destructive"
        onClick={() => setOpen(true)}
      >
        Delete school
      </Button>
      <DeleteSchoolDialog open={open} setOpen={setOpen} schoolId={school._id} />
    </>
  );
}
