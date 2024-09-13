import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { assignmentType } from "./schema";
import { assertCourseManager } from "./courses";
import { getCurrentSemester } from "./schools";

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

    const assignmentId = await ctx.db.insert("courseAssignments", {
      courseId: args.courseId,
      title: args.title,
      description: args.description,
      type: args.type,
      date: args.date,
      file: args.file,
    });

    return assignmentId;
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

    await ctx.db.delete(args.assignmentId);
  },
});
