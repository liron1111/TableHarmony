"use client";

import { useState } from "react";

import { api } from "../../../../../../../convex/_generated/api";
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

export function ExitSchoolDialog() {
  const { school } = useSchool();

  const [isPending, setIsPending] = useState(false);
  const exit = useMutation(api.schools.exitSchool);

  async function onSubmit() {
    if (!school) return;

    setIsPending(true);

    try {
      await exit({ schoolId: school._id });
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
        <Button variant="destructive">Exit school</Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Exit school</CredenzaTitle>
          <CredenzaDescription>
            Are you sure you want to exit this school?
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
