"use client";

import { useState } from "react";

import { useMutation } from "convex/react";
import { api } from "../../../../../../../../convex/_generated/api";
import { useSchool } from "../../../_components/school-context";

import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

export function UpdateVisibilityForm() {
  const { school } = useSchool();
  const updateSchool = useMutation(api.schools.updateSchool);

  const [checked, setChecked] = useState(school.isPublic);

  async function handleCheckedChange(checked: boolean) {
    setChecked(checked);
    try {
      await updateSchool({ schoolId: school._id, isPublic: checked });
      toast.success("Updated school visibility!");
    } catch (error) {
      setChecked(school.isPublic);
      console.error(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <Switch
      aria-label="visibility"
      checked={checked}
      onCheckedChange={handleCheckedChange}
    />
  );
}
