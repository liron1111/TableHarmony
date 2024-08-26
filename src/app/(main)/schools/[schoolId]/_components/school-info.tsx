"use client";

import "@/styles/tiptap.css";

import { extensions } from "@/components/tiptap";
import { EditorProvider } from "@tiptap/react";
import { useContext } from "react";
import { SchoolContext } from "./school-context";

export function SchoolInfo() {
  const { school } = useContext(SchoolContext);

  return (
    <div className="w-full space-y-4 rounded-md border border-border">
      <EditorProvider
        extensions={extensions}
        content={
          school.info ?? `<h1>${school.name}</h1> <p>${school.description}</p>`
        }
        editable={false}
        immediatelyRender={true}
      />
    </div>
  );
}
