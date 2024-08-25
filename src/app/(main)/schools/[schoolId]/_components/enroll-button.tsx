"use client";

import { useContext, useState } from "react";

import { api } from "../../../../../../convex/_generated/api";
import { useMutation } from "convex/react";

import { toast } from "sonner";
import { LoaderButton } from "@/components/loader-button";
import { SchoolContext } from "./school-context";

export function EnrollButton() {
  const { school } = useContext(SchoolContext);

  const [isPending, setIsPending] = useState(false);
  const enroll = useMutation(api.schools.enroll);

  async function onSubmit() {
    setIsPending(true);

    try {
      await enroll({ role: "student", schoolId: school._id });
      toast.success("Enrolled successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }

    setIsPending(false);
  }

  return (
    <LoaderButton isLoading={isPending} onClick={onSubmit}>
      Enroll as a student
    </LoaderButton>
  );
}
