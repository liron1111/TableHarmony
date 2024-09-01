"use client";

import { useEffect, useState } from "react";

import { useMutation } from "convex/react";
import { api } from "../../../../../../../../convex/_generated/api";
import { useSchool } from "../../../_components/providers/school-provider";

import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

export function UpdateVisibilityForm() {
  const { school } = useSchool();
  const updateSchool = useMutation(api.schools.updateSchool);

  const [checked, setChecked] = useState(school?.isPublic);

  useEffect(() => {
    setChecked(school?.isPublic);
  }, [school?.isPublic]);

  async function handleCheckedChange(checked: boolean) {
    if (!school) return;

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
    <div className="flex max-w-md flex-row items-center justify-between rounded-lg border p-4">
      <span className="text-base font-medium">Is public</span>
      <Switch
        aria-label="visibility"
        checked={checked}
        onCheckedChange={handleCheckedChange}
      />
    </div>
  );
}
