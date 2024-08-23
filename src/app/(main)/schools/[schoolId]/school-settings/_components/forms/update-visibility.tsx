"use client";

import { useContext, useState } from "react";

import { useMutation } from "convex/react";
import { api } from "../../../../../../../../convex/_generated/api";
import { SchoolContext } from "../../../_components/school-context";

import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

export function UpdateVisibilityForm() {
  const { school } = useContext(SchoolContext);
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

  return <Switch checked={checked} onCheckedChange={handleCheckedChange} />;
}
