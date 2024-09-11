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

  if (!course?.info)
    return (
      <div className={cardStyles}>
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-balance text-lg font-semibold md:text-xl">
            Welcome to {course?.name}!
          </span>
          <p className="text-balance text-muted-foreground">
            {course?.description}
          </p>
        </div>
        <Image src="/assets/hello.svg" alt="course" width="500" height="500" />
      </div>
    );

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
