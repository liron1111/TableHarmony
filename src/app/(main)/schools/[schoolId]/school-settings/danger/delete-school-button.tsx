"use client";

import { useState } from "react";

import { Id } from "../../../../../../../convex/_generated/dataModel";

import { Button } from "@/components/ui/button";
import { DeleteSchoolDialog } from "../../../_components/delete-school-dialog";

export function DeleteSchoolButton({ schoolId }: { schoolId: Id<"schools"> }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        className="w-fit"
        variant="destructive"
        onClick={() => setOpen(true)}
      >
        Delete school
      </Button>
      <DeleteSchoolDialog open={open} setOpen={setOpen} schoolId={schoolId} />
    </>
  );
}
