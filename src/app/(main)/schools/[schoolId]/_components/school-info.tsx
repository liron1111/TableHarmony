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
        content={school.info ?? "This school has no info yet..."}
        editable={false}
        immediatelyRender={true}
      />
    </div>
  );
}
