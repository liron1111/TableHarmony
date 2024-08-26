"use client";

import "@/styles/tiptap.css";

import { useContext, useRef, useState } from "react";

import { useMutation } from "convex/react";
import { api } from "../../../../../../../../convex/_generated/api";

import { MenuBar, extensions } from "@/components/tiptap";
import { LoaderButton } from "@/components/loader-button";

import { EditorProvider } from "@tiptap/react";
import { toast } from "sonner";
import { SchoolContext } from "../../../_components/school-context";

export function UpdateInfoForm() {
  const { school } = useContext(SchoolContext);
  const updateSchool = useMutation(api.schools.updateSchool);

  const htmlRef = useRef<string>("");

  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit() {
    setIsLoading(true);

    try {
      await updateSchool({ schoolId: school?._id!, info: htmlRef.current });
      toast.success("Updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }

    setIsLoading(false);
  }

  return (
    <div className="w-full space-y-4">
      <EditorProvider
        onUpdate={({ editor }) => {
          htmlRef.current = editor.getHTML();
        }}
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={school.info}
        editable={true}
        immediatelyRender={false}
      />

      <div className="flex justify-end">
        <LoaderButton
          onClick={onSubmit}
          isLoading={isLoading}
          className="self-end"
        >
          Save
        </LoaderButton>
      </div>
    </div>
  );
}
