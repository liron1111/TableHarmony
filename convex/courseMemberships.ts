import { ConvexError, v } from "convex/values";
import {
  internalMutation,
  internalQuery,
  mutation,
  query,
} from "./_generated/server";

import { courseRoleType } from "./schema";

import { assertAuthenticated } from "./users";
import { assertCourseManager } from "./courses";

export const createCourseMembership = internalMutation({
  args: {
    courseId: v.id("courses"),
    userId: v.id("users"),
    role: courseRoleType,
  },
  async handler(ctx, args) {
    const course = await assertCourseManager(ctx, { courseId: args.courseId });

    if (!course) {
      throw new ConvexError("Unauthorized: Cannot create a course membership");
    }

    const courseMembership = await getCourseMembership(ctx, {
      userId: args.userId,
      courseId: course._id,
    });

    if (courseMembership) throw new ConvexError("Already a member in course");

    await ctx.db.insert("courseMemberships", {
      userId: args.userId,
      courseId: course._id,
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

    const course = await assertCourseManager(ctx, {
      courseId: membership.courseId,
    });

    if (!course && user._id !== membership.userId)
      throw new ConvexError("Unauthorized: Cannot delete course membership");

    await ctx.db.delete(membership._id);
  },
});

export const deleteCourseMemberships = mutation({
  args: {
    membershipIds: v.array(v.id("courseMemberships")),
  },
  async handler(ctx, args) {
    const promises = args.membershipIds.map((membershipId) =>
      deleteCourseMembership(ctx, { membershipId })
    );

    await Promise.all(promises);
  },
});

export const getUserCourseMemberships = internalQuery({
  args: {
    schoolId: v.id("schools"),
    userId: v.id("users"),
  },
  async handler(ctx, args) {
    const memberships = await ctx.db
      .query("courseMemberships")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();

    const membershipsInSchool = await Promise.all(
      memberships.map(async (membership) => {
        const course = await ctx.db.get(membership.courseId);
        return course?.schoolId === args.schoolId ? membership : null;
      })
    );

    return membershipsInSchool.filter((membership) => membership !== null);
  },
});
