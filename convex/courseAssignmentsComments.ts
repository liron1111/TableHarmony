import { ConvexError, v } from "convex/values";
import { internalQuery, mutation, query } from "./_generated/server";

import { getCourseMembership } from "./courseMemberships";
import { assertAuthenticated, getCurrentUser } from "./users";
import { trackEvent } from "./events";

export const assertCommentAccess = internalQuery({
  args: {
    commentId: v.id("courseAssignmentsComments"),
  },
  async handler(ctx, args) {
    const user = await getCurrentUser(ctx, {});

    if (!user) return null;

    const comment = await ctx.db.get(args.commentId);

    if (!comment) return null;
    if (comment.userId === user._id) return comment;

    const assignment = await ctx.db.get(comment.assignmentId);

    if (!assignment) return null;

    const courseMembership = await getCourseMembership(ctx, {
      courseId: assignment.courseId,
      userId: user._id,
    });

    if (courseMembership?.role !== "manager") return null;

    return comment;
  },
});

export const createComment = mutation({
  args: {
    assignmentId: v.id("courseAssignments"),
    comment: v.string(),
  },
  async handler(ctx, args) {
    const user = await assertAuthenticated(ctx, {});

    const assignment = await ctx.db.get(args.assignmentId);

    if (!assignment) {
      throw new ConvexError("Assignment not found");
    }

    const course = await ctx.db.get(assignment.courseId);

    if (!course) {
      throw new ConvexError("Course not found");
    }

    const courseMembership = await getCourseMembership(ctx, {
      courseId: course._id,
      userId: user._id,
    });

    if (!courseMembership) {
      throw new ConvexError("You are not a member of this course");
    }

    await ctx.db.insert("courseAssignmentsComments", {
      assignmentId: assignment._id,
      userId: user._id,
      comment: args.comment,
    });

    trackEvent(ctx, {
      objectId: assignment.courseId,
      key: "comment created",
    });
  },
});

export const deleteComment = mutation({
  args: {
    commentId: v.id("courseAssignmentsComments"),
  },
  async handler(ctx, args) {
    const comment = await assertCommentAccess(ctx, {
      commentId: args.commentId,
    });

    if (!comment) throw new ConvexError("Unauthorized: Cannot delete comment");

    await ctx.db.delete(args.commentId);

    const assignment = await ctx.db.get(comment.assignmentId);
    if (!assignment) throw new ConvexError("Assignment not found");
    trackEvent(ctx, {
      objectId: assignment.courseId,
      key: "comment deleted",
    });
  },
});

export const getComment = query({
  args: {
    commentId: v.id("courseAssignmentsComments"),
  },
  async handler(ctx, args) {
    const comment = await ctx.db.get(args.commentId);
    return comment;
  },
});

export const updateComment = mutation({
  args: {
    commentId: v.id("courseAssignmentsComments"),
    comment: v.string(),
  },
  async handler(ctx, args) {
    const comment = await assertCommentAccess(ctx, {
      commentId: args.commentId,
    });

    if (!comment) {
      throw new ConvexError("Unauthorized: Cannot update comment");
    }

    await ctx.db.patch(args.commentId, { comment: args.comment });

    const assignment = await ctx.db.get(comment.assignmentId);
    if (!assignment) throw new ConvexError("Assignment not found");
    trackEvent(ctx, {
      objectId: assignment.courseId,
      key: "comment updated",
    });
  },
});
