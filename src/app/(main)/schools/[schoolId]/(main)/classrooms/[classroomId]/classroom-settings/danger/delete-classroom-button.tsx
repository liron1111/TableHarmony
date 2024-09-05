"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useMembership } from "@/app/(main)/schools/[schoolId]/_components/providers/membership-provider";
import { DeleteClassroomDialog } from "../../../_components/delete-classroom-dialog";
import { useClassroom } from "../../_components/providers/classroom-provider";

export function DeleteClassroomButton() {
  const [open, setOpen] = useState(false);

  const { membership } = useMembership();
  const { classroom } = useClassroom();

  if (!classroom || membership?.role !== "manager") return null;

  return (
    <>
      <Button
        className="w-full md:w-fit"
        variant="destructive"
        onClick={() => setOpen(true)}
      >
        Delete classroom
      </Button>
      <DeleteClassroomDialog
        open={open}
        setOpen={setOpen}
        classroomId={classroom._id}
      />
    </>
  );
}
