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
import { useClassroom } from "./providers/classroom-provider";

export function JoinClassroomDialog() {
  const { classroom } = useClassroom();

  const [isPending, setIsPending] = useState(false);
  const joinClassroom = useMutation(api.classrooms.joinClassroom);

  async function onSubmit() {
    if (!classroom) return;

    setIsPending(true);

    try {
      await joinClassroom({ classroomId: classroom._id });
      toast.success("Joined successfully!");
    } catch (error) {
      const formattedError = shapeErrors({ error });
      toast.error(formattedError.message);
    }

    setIsPending(false);
  }

  return (
    <Credenza>
      <CredenzaTrigger>
        <Button>Join classroom</Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Join classroom</CredenzaTitle>
          <CredenzaDescription>
            Are you sure you want to join this classroom?
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaFooter>
          <CredenzaClose asChild>
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </CredenzaClose>
          <LoaderButton
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
