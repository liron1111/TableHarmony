"use client";

import { Dispatch, SetStateAction, useState } from "react";

import { api } from "../../../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";

import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import { toast } from "sonner";
import { LoaderButton } from "@/components/loader-button";
import { Button } from "@/components/ui/button";
import { shapeErrors } from "@/utils/errors";
import { useParams } from "next/navigation";

function EnrollCourseForm({
  setShowDialog,
}: {
  setShowDialog: Dispatch<SetStateAction<boolean>>;
}) {
  const [isPending, setIsPending] = useState(false);
  const enrollCourse = useMutation(api.courses.enroll);

  const { courseId } = useParams();

  async function onSubmit() {
    setIsPending(true);

    try {
      await enrollCourse({ courseId: courseId as Id<"courses"> });
      toast.success("Enrolled course successfully!");
    } catch (error) {
      const formattedError = shapeErrors({ error });
      toast.error(formattedError.message);
    }

    setIsPending(false);
    setShowDialog(false);
  }

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        className="w-full"
        onClick={() => setShowDialog(false)}
      >
        Cancel
      </Button>
      <LoaderButton isLoading={isPending} className="w-full" onClick={onSubmit}>
        Confirm
      </LoaderButton>
    </div>
  );
}

export function EnrollCourseDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Credenza open={showDialog} onOpenChange={setShowDialog}>
      <CredenzaTrigger>{children}</CredenzaTrigger>

      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Enroll</CredenzaTitle>
          <CredenzaDescription>
            Are you sure you want to enroll in this course?
          </CredenzaDescription>
        </CredenzaHeader>

        <EnrollCourseForm setShowDialog={setShowDialog} />
      </CredenzaContent>
    </Credenza>
  );
}
