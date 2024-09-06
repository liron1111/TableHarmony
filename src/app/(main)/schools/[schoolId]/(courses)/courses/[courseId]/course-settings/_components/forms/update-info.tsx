"use client";

import "@/styles/tiptap.css";

import { useRef, useState } from "react";

import { useMutation } from "convex/react";
import { api } from "../../../../../../../../../../../convex/_generated/api";

import { MenuBar, extensions } from "@/components/tiptap";
import { LoaderButton } from "@/components/loader-button";

import { useCourse } from "../../../../_components/providers/course-provider";

import { EditorProvider } from "@tiptap/react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { shapeErrors } from "@/utils/errors";

export function UpdateInfoForm() {
  const { course } = useCourse();
  const updateCourse = useMutation(api.courses.updateCourse);

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
      await updateCourse({ courseId: course?._id!, info });
      toast.success("Updated successfully!");
    } catch (error) {
      const formattedError = shapeErrors({ error });
      toast.error(formattedError.message);
    }

    setIsLoading(false);
  }

  if (!course) return <Skeleton className="h-64 w-full" />;

  return (
    <div className="w-full space-y-4">
      <EditorProvider
        onUpdate={({ editor }) => {
          htmlRef.current = editor.getHTML();
        }}
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={course?.info}
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
