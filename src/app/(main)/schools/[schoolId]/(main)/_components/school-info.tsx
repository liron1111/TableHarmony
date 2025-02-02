"use client";

import "@/styles/tiptap.css";

import { extensions } from "@/components/tiptap";
import { EditorProvider } from "@tiptap/react";
import { useSchool } from "@/app/(main)/schools/[schoolId]/_components/providers/school-provider";
import Image from "next/image";
import { cardStyles } from "@/styles/common";

export function SchoolInfo() {
  const { school } = useSchool();

  if (!school) return null;

  return (
    <div className="space-y-10">
      <Info />
    </div>
  );
}

function Info() {
  const { school } = useSchool();

  if (!school?.info)
    return (
      <div className={cardStyles}>
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-balance text-lg font-semibold md:text-xl">
            Welcome to {school?.name}!
          </span>
          <p className="text-balance text-muted-foreground">
            {school?.description}
          </p>
        </div>
        <Image
          src="/assets/welcome-cats.svg"
          alt="school"
          width="500"
          height="500"
        />
      </div>
    );

  return (
    <div className="w-full space-y-4 rounded-md border border-border">
      <EditorProvider
        extensions={extensions}
        content={
          school.info ?? `<h1>${school.name}</h1> <p>${school.description}</p>`
        }
        editable={false}
        immediatelyRender={false}
      />
    </div>
  );
}
