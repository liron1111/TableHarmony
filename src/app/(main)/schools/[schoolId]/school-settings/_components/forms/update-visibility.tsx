"use client";

import { useContext } from "react";

import { useMutation } from "convex/react";
import { api } from "../../../../../../../../convex/_generated/api";
import { SchoolContext } from "../../../_components/school-context";

import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

export function UpdateVisibilityForm() {
  const { school } = useContext(SchoolContext);
  const updateSchool = useMutation(api.schools.updateSchool);
  //TODO: apply optimistic update

  async function handleCheckedChange(checked: boolean) {
    try {
      await updateSchool({ schoolId: school._id, isPublic: checked });
      toast.success("Updated school visibility!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <Switch checked={school.isPublic} onCheckedChange={handleCheckedChange} />
  );
}
