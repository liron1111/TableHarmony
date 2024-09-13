import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { assertAuthenticated, getUserById } from "./users";

export const createSubmission = mutation({
  args: {
    assignmentId: v.id("courseAssignments"),
    comment: v.optional(v.string()),
    file: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await assertAuthenticated(ctx, {});

    const submission = await getSubmission(ctx, {
      assignmentId: args.assignmentId,
      userId: user._id,
    });

    if (submission) {
      throw new ConvexError("Submission already exists");
    }

    await ctx.db.insert("courseAssignmentsSubmissions", {
      assignmentId: args.assignmentId,
      userId: user._id,
      file: args.file,
      comment: args.comment,
    });
  },
});

export const getSubmission = query({
  args: {
    assignmentId: v.id("courseAssignments"),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const submission = await ctx.db
      .query("courseAssignmentsSubmissions")
      .withIndex("by_assignmentId_userId", (q) =>
        q.eq("assignmentId", args.assignmentId).eq("userId", args.userId)
      )
      .first();

    return submission;
  },
});

export const updateSubmission = mutation({
  args: {
    assignmentId: v.id("courseAssignments"),
    userId: v.id("users"),
    comment: v.optional(v.string()),
    file: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getUserById(ctx, { userId: args.userId });
    if (!user) throw new ConvexError("User not found");

    const assignment = await ctx.db.get(args.assignmentId);
    if (!assignment) throw new ConvexError("Assignment not found");

    const submission = await getSubmission(ctx, {
      assignmentId: assignment._id,
      userId: user._id,
    });

    if (!submission) throw new ConvexError("Submission not found");

    //TODO: allow course manager update ?

    if (submission.userId !== user._id)
      throw new ConvexError("Unauthorized: Cannot update submission");

    await ctx.db.patch(submission._id, {
      comment: args.comment ?? submission.comment,
      file: args.file ?? submission.file,
    });
  },
});
