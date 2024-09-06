import { v } from "convex/values";
import { internalMutation, query } from "./_generated/server";
import { courseRoleType } from "./schema";

export const createCourseMembership = internalMutation({
  args: {
    courseId: v.id("courses"),
    userId: v.id("users"),
    role: courseRoleType,
  },
  async handler(ctx, args) {
    await ctx.db.insert("courseMemberships", {
      userId: args.userId,
      courseId: args.courseId,
      role: args.role,
    });
  },
});

export const getCourseMembership = query({
  args: {
    courseId: v.id("courses"),
    userId: v.id("users"),
  },
  async handler(ctx, args) {
    const membership = await ctx.db
      .query("courseMemberships")
      .withIndex("by_courseId_userId", (q) =>
        q.eq("courseId", args.courseId).eq("userId", args.userId)
      )
      .first();

    return membership;
  },
});
