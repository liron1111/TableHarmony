"use client";

import { api } from "../../../../../../../../../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { Doc } from "../../../../../../../../../../../../convex/_generated/dataModel";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { useCourse } from "../../../../../_components/providers/course-provider";
import { DeleteCommentButton } from "./delete-comment-button";
import { EditCommentSheet } from "./edit-comment-sheet";

interface CommentCardProps {
  comment: Doc<"courseAssignmentsComments"> & { user: Doc<"users"> };
}

export function CommentCard({ comment }: CommentCardProps) {
  const user = useQuery(api.users.getCurrentUser, {});
  const { membership } = useCourse();

  return (
    <Card className="relative">
      {(user?._id === comment.user._id || membership?.role === "manager") && (
        <div className="absolute right-4 top-4 flex">
          <DeleteCommentButton commentId={comment._id} />
          <EditCommentSheet commentId={comment._id} />
        </div>
      )}
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="size-6">
          <AvatarImage src={comment.user.image} alt={comment.user.name} />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-4">
          <span className="font-semibold">{comment.user.name}</span>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(comment._creationTime, {
              addSuffix: true,
            })}
          </span>
        </div>
      </CardHeader>
      <CardContent>{comment.comment}</CardContent>
    </Card>
  );
}
