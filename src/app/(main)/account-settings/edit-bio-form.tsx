"use client";

import "@/styles/tiptap.css";

import { useRef, useState } from "react";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

import { MenuBar, extensions } from "@/components/tiptap";
import { LoaderButton } from "@/components/loader-button";

import { EditorProvider } from "@tiptap/react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export function EditBioForm() {
  const user = useQuery(api.users.getCurrentUser);
  const updateUser = useMutation(api.users.updateUser);

  const htmlRef = useRef<string>(user?.bio ?? "");

  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit() {
    setIsLoading(true);

    try {
      await updateUser({ clerkId: user?.clerkId!, bio: htmlRef.current });
      toast.success("Updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }

    setIsLoading(false);
  }

  if (!user) return <Skeleton className="h-64 w-full" />;

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
