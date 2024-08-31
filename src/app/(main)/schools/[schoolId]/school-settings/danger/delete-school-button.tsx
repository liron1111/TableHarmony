"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { DeleteSchoolDialog } from "../../../_components/delete-school-dialog";
import { useSchool } from "../../_components/school-context";

export function DeleteSchoolButton() {
  const [open, setOpen] = useState(false);
  const { school, membership } = useSchool();

  if (membership?.role !== "manager") return null;

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
