"use client";

import { useRef, useState } from "react";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

import { MenuBar, extensions } from "@/components/tiptap";
import { LoaderButton } from "@/components/loader-button";
import { useToast } from "@/components/ui/use-toast";

import { EditorProvider } from "@tiptap/react";

export function EditBioForm() {
  const user = useQuery(api.users.getCurrentUser);
  const updateUser = useMutation(api.users.updateUser);

  const htmlRef = useRef<string>(user?.bio ?? "");
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit() {
    setIsLoading(true);

    try {
      await updateUser({ userId: user?._id!, bio: htmlRef.current });
      toast({ description: "Bio successfully updated!", variant: "success" });
    } catch (error) {
      console.error(error);
      toast({ description: "Something went wrong", variant: "destructive" });
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
        content={user?.bio}
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
