"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { useCourse } from "../../../_components/providers/course-provider";
import { DeleteCourseDialog } from "../../../_components/delete-course-dialog";

export function DeleteCourseButton() {
  const [open, setOpen] = useState(false);

  const { course, membership } = useCourse();

  if (!course || membership?.role !== "manager") return null;

  return (
    <>
      <Button
        className="w-full md:w-fit"
        variant="destructive"
        onClick={() => setOpen(true)}
      >
        Delete course
      </Button>
      <DeleteCourseDialog courseId={course._id} open={open} setOpen={setOpen} />
    </>
  );
}
