"use client";

import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { DeleteSchoolDialog } from "../../../_components/delete-school-dialog";
import { SchoolContext } from "../../_components/school-context";

export function DeleteSchoolButton() {
  const { school } = useContext(SchoolContext);
  const [open, setOpen] = useState(false);

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
