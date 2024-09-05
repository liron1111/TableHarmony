"use client";

import { useState } from "react";

import { api } from "../../../../../../../../../convex/_generated/api";
import { useMutation } from "convex/react";

import { toast } from "sonner";
import { LoaderButton } from "@/components/loader-button";
import { useSchool } from "@/app/(main)/schools/[schoolId]/_components/providers/school-provider";
import {
  Credenza,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import { Button } from "@/components/ui/button";
import { shapeErrors } from "@/utils/errors";
import { useClassroomMembership } from "./providers/classroom-membership-provider";

export function ExitClassroomDialog() {
  const { classroomMembership } = useClassroomMembership();

  const [isPending, setIsPending] = useState(false);
  const exitClassroom = useMutation(api.classrooms.exitClassroom);

  async function onSubmit() {
    if (!classroomMembership) return;

    setIsPending(true);

    try {
      await exitClassroom({ classroomId: classroomMembership.classroomId });
      toast.success("Exited successfully!");
    } catch (error) {
      const formattedError = shapeErrors({ error });
      toast.error(formattedError.message);
    }

    setIsPending(false);
  }

  return (
    <Credenza>
      <CredenzaTrigger>
        <Button variant="destructive">Exit classroom</Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Exit classroom</CredenzaTitle>
          <CredenzaDescription>
            Are you sure you want to exit this classroom?
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaFooter>
          <CredenzaClose asChild>
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </CredenzaClose>
          <LoaderButton
            variant="destructive"
            className="w-full"
            isLoading={isPending}
            onClick={onSubmit}
          >
            Confirm
          </LoaderButton>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
}
