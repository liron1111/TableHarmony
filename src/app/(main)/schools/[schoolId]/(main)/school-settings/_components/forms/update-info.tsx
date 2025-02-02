"use client";

import "@/styles/tiptap.css";

import { useRef, useState } from "react";

import { useMutation } from "convex/react";
import { api } from "../../../../../../../../../convex/_generated/api";

import { MenuBar, extensions } from "@/components/tiptap";
import { LoaderButton } from "@/components/loader-button";

import { EditorProvider } from "@tiptap/react";
import { toast } from "sonner";
import { useSchool } from "@/app/(main)/schools/[schoolId]/_components/providers/school-provider";
import { Skeleton } from "@/components/ui/skeleton";
import { shapeErrors } from "@/utils/errors";

export function UpdateInfoForm() {
  const { school } = useSchool();
  const updateSchool = useMutation(api.schools.updateSchool);

  const htmlRef = useRef<string>("");

  const [isLoading, setIsLoading] = useState(false);

  function isEmptyHtml(html: string): boolean {
    const textContent = html.replace(/<[^>]*>/g, "");
    return textContent.trim().length === 0;
  }

  async function onSubmit() {
    setIsLoading(true);

    try {
      const info = isEmptyHtml(htmlRef.current) ? "" : htmlRef.current;
      await updateSchool({ schoolId: school?._id!, info });
      toast.success("Updated successfully!");
    } catch (error) {
      const formattedError = shapeErrors({ error });
      toast.error(formattedError.message);
    }

    setIsLoading(false);
  }

  if (!school) return <Skeleton className="h-64 w-full" />;

  return (
    <div className="w-full space-y-4">
      <EditorProvider
        onUpdate={({ editor }) => {
          htmlRef.current = editor.getHTML();
        }}
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={school?.info}
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
