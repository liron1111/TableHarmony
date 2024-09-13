"use client";

import { useParams } from "next/navigation";

import { useQuery } from "convex/react";
import { api } from "../../../../../../../../../../../../convex/_generated/api";
import {
  Doc,
  Id,
} from "../../../../../../../../../../../../convex/_generated/dataModel";
import { CommentForm } from "./comment-form";
import { CommentCard } from "./comment-card";

export function CommentList() {
  const { assignmentId } = useParams();

  const comments = useQuery(api.courseAssignments.getAssignmentComments, {
    assignmentId: assignmentId as Id<"courseAssignments">,
  });

  if (!comments) return null;

  return (
    <div className="space-y-5">
      <CommentForm assignmentId={assignmentId as Id<"courseAssignments">} />
      {comments.map((comment) => (
        <CommentCard key={comment._id} comment={comment} />
      ))}
    </div>
  );
}
