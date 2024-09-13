"use client";

import { useState } from "react";

import { useMutation } from "convex/react";
import { Id } from "../../../../../../../../../../../../convex/_generated/dataModel";
import { api } from "../../../../../../../../../../../../convex/_generated/api";

import { LoaderButton } from "@/components/loader-button";
import { TrashIcon } from "lucide-react";

export function DeleteCommentButton({
  commentId,
}: {
  commentId: Id<"courseAssignmentsComments">;
}) {
  const deleteComment = useMutation(
    api.courseAssignmentsComments.deleteCourseAssignmentComment
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteComment({ commentId });
    setIsLoading(false);
  };

  return (
    <LoaderButton
      onClick={handleDelete}
      isLoading={isLoading}
      icon={<TrashIcon className="size-4 text-destructive" />}
      aria-label="delete"
      variant="ghost"
    />
  );
}
