import { ConvexError, v } from "convex/values";
import { internalMutation, query } from "./_generated/server";
import { courseRoleType } from "./schema";
import { assertAuthenticated } from "./users";
import { getCourse } from "./courses";

export const createCourseMembership = internalMutation({
  args: {
    courseId: v.id("courses"),
    userId: v.id("users"),
    role: courseRoleType,
  },
  async handler(ctx, args) {
    await assertAuthenticated(ctx, {});

    const course = await getCourse(ctx, { courseId: args.courseId });

    if (!course) {
      throw new ConvexError("Course not found");
    }

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

export const deleteCourseMembership = internalMutation({
  args: {
    membershipId: v.id("courseMemberships"),
  },
  async handler(ctx, args) {
    const membership = await ctx.db.get(args.membershipId);

    if (!membership) {
      throw new ConvexError("Course membership not found");
    }

    const user = await assertAuthenticated(ctx, {});

    //TODO: assert available

    await ctx.db.delete(membership._id);
  },
});
