"use client";

import { Dispatch, SetStateAction, useState } from "react";

import { api } from "../../../../../../../convex/_generated/api";
import { useMutation } from "convex/react";

import { toast } from "sonner";
import { LoaderButton } from "@/components/loader-button";
import { useSchool } from "@/app/(main)/schools/[schoolId]/_components/providers/school-provider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { shapeErrors } from "@/utils/errors";

export function EnrollSchoolForm({
  setShowSheet,
}: {
  setShowSheet: Dispatch<SetStateAction<boolean>>;
}) {
  const { school } = useSchool();
  const [isPending, setIsPending] = useState(false);
  const enroll = useMutation(api.schools.enroll);

  const [role, setRole] = useState<"teacher" | "student">("student");

  async function onSubmit() {
    if (!school) return;

    setIsPending(true);

    try {
      await enroll({ role: role, schoolId: school._id });
      toast.success("Enrolled successfully!");
    } catch (error) {
      const formattedError = shapeErrors({ error });
      toast.error(formattedError.message);
    }

    setShowSheet(false);
    setIsPending(false);
  }

  return (
    <div className="mt-4 space-y-4">
      <Select
        disabled={isPending}
        value={role}
        onValueChange={(value: "teacher" | "student") => setRole(value)}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {["teacher", "student"].map((label) => (
            <SelectItem key={label} value={label}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex w-full sm:justify-end">
        <LoaderButton
          onClick={onSubmit}
          isLoading={isPending}
          className="w-full md:w-auto"
        >
          Enroll
        </LoaderButton>
      </div>
    </div>
  );
}

export function EnrollSchoolSheet() {
  const [showSheet, setShowSheet] = useState(false);
  const { school } = useSchool();

  return (
    <Sheet open={showSheet} onOpenChange={setShowSheet}>
      <SheetTrigger asChild>
        <Button>Enroll</Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>{school?.name} enrollment</SheetTitle>
          <SheetDescription>
            Please enter your details to enroll to {school?.name}.
          </SheetDescription>
        </SheetHeader>
        <EnrollSchoolForm setShowSheet={setShowSheet} />
      </SheetContent>
    </Sheet>
  );
}
