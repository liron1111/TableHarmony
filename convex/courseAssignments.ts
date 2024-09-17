import { ConvexError, v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";
import { assignmentType } from "./schema";
import { assertCourseManager } from "./courses";
import { getCurrentSemester } from "./schools";
import { trackEvent } from "./events";

export const createCourseAssignment = mutation({
  args: {
    courseId: v.id("courses"),
    title: v.string(),
    description: v.string(),
    type: assignmentType,
    date: v.number(),
    file: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const course = await assertCourseManager(ctx, {
      courseId: args.courseId,
    });

    if (!course)
      throw new ConvexError("Unauthorized: Cannot create assignment");

    const semester = await getCurrentSemester(ctx, {
      schoolId: course.schoolId,
    });

    if (!semester)
      throw new ConvexError(
        "Cannot create an assignment not during a semester"
      );

    if (args.date > semester.to)
      throw new ConvexError(
        "Cannot create an assignment not during current semester"
      );

    await ctx.db.insert("courseAssignments", {
      courseId: args.courseId,
      title: args.title,
      description: args.description,
      type: args.type,
      date: args.date,
      file: args.file,
    });

    trackEvent(ctx, {
      objectId: args.courseId,
      key: "assignment created",
    });
  },
});

export const getAssignment = query({
  args: {
    assignmentId: v.id("courseAssignments"),
  },
  async handler(ctx, args) {
    return await ctx.db.get(args.assignmentId);
  },
});

export const updateAssignment = mutation({
  args: {
    assignmentId: v.id("courseAssignments"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    type: v.optional(assignmentType),
    date: v.optional(v.number()),
    file: v.optional(v.string()),
  },
  async handler(ctx, args) {
    const assignment = await ctx.db.get(args.assignmentId);

    if (!assignment) throw new ConvexError("Assignment not found");

    const course = await assertCourseManager(ctx, {
      courseId: assignment.courseId,
    });

    if (!course)
      throw new ConvexError("Unauthorized: Cannot update assignment");

    await ctx.db.patch(args.assignmentId, {
      title: args.title,
      description: args.description,
      type: args.type,
      date: args.date,
      file: args.file,
    });

    trackEvent(ctx, {
      objectId: assignment.courseId,
      key: "assignment updated",
    });
  },
});

export const deleteAssignment = mutation({
  args: {
    assignmentId: v.id("courseAssignments"),
  },
  async handler(ctx, args) {
    const assignment = await ctx.db.get(args.assignmentId);

    if (!assignment) throw new ConvexError("Assignment not found");

    const course = await assertCourseManager(ctx, {
      courseId: assignment.courseId,
    });

    if (!course)
      throw new ConvexError("Unauthorized: Cannot delete assignment");

    await deleteAssignmentCascade(ctx, { assignmentId: args.assignmentId });

    trackEvent(ctx, {
      objectId: assignment.courseId,
      key: "assignment deleted",
    });
  },
});

export const deleteAssignmentCascade = internalMutation({
  args: {
    assignmentId: v.id("courseAssignments"),
  },
  async handler(ctx, args) {
    const assignment = await ctx.db.get(args.assignmentId);

    if (!assignment) throw new ConvexError("Assignment not found");

    const [comments, submissions] = await Promise.all([
      getComments(ctx, { assignmentId: args.assignmentId }),
      getSubmissions(ctx, { assignmentId: args.assignmentId }),
    ]);

    await Promise.all([
      ...comments.map((comment) => ctx.db.delete(comment._id)),
      ...submissions.map((submission) => ctx.db.delete(submission._id)),
    ]);

    await ctx.db.delete(args.assignmentId);
  },
});

export const getSubmissions = query({
  args: {
    assignmentId: v.id("courseAssignments"),
  },
  async handler(ctx, args) {
    const submissions = await ctx.db
      .query("courseAssignmentsSubmissions")
      .withIndex("by_assignmentId", (q) =>
        q.eq("assignmentId", args.assignmentId)
      )
      .collect();

    const submissionsWithUsers = await Promise.all(
      submissions.map(async (submission) => {
        const user = await ctx.db.get(submission.userId);
        if (!user) return null;
        return { ...submission, user };
      })
    );

    return submissionsWithUsers.filter((submission) => submission !== null);
  },
});

export const getComments = query({
  args: {
    assignmentId: v.id("courseAssignments"),
  },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("courseAssignmentsComments")
      .withIndex("by_assignmentId", (q) =>
        q.eq("assignmentId", args.assignmentId)
      )
      .order("desc")
      .collect();

    const commentsWithUsers = await Promise.all(
      comments.map(async (comment) => {
        const user = await ctx.db.get(comment.userId);
        if (!user) return null;
        return { ...comment, user };
      })
    );

    return commentsWithUsers.filter((comment) => comment !== null);
  },
});
