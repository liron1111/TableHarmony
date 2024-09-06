"use client";

import "@/styles/tiptap.css";

import { useCourse } from "../../_components/providers/course-provider";

import { extensions } from "@/components/tiptap";
import { EditorProvider } from "@tiptap/react";

import Image from "next/image";
import { cardStyles } from "@/styles/common";

export function CourseInfo() {
  const { course } = useCourse();

  if (!course) return null;

  return (
    <div className="space-y-10">
      <Info />
    </div>
  );
}

function Info() {
  const { course } = useCourse();

  return (
    <div className="w-full space-y-4 rounded-md border border-border">
      <EditorProvider
        extensions={extensions}
        content={
          course?.info ??
          `<h1>${course?.name}</h1> <p>${course?.description}</p>`
        }
        editable={false}
        immediatelyRender={false}
      />
    </div>
  );
}
