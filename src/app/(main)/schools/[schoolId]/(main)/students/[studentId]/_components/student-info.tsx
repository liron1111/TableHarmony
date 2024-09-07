"use client";

import "@/styles/tiptap.css";

import { extensions } from "@/components/tiptap";
import { EditorProvider } from "@tiptap/react";
import Image from "next/image";
import { cardStyles } from "@/styles/common";
import { useStudent } from "./student-provider";

export function StudentInfo() {
  const { student } = useStudent();

  if (!student) return null;

  return (
    <div className="space-y-10">
      <Info />
    </div>
  );
}

function Info() {
  const { student } = useStudent();

  if (!student?.bio)
    return (
      <div className={cardStyles}>
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-balance text-lg font-semibold md:text-xl">
            Hello, this is {student?.name}!
          </span>
        </div>
        <Image src="/assets/hello.svg" alt="student" width="500" height="500" />
      </div>
    );

  return (
    <div className="w-full space-y-4 rounded-md border border-border">
      <EditorProvider
        extensions={extensions}
        content={student.bio}
        editable={false}
        immediatelyRender={false}
      />
    </div>
  );
}
