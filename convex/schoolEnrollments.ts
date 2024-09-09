import { ConvexError, v } from "convex/values";
import { internalMutation, internalQuery, mutation } from "./_generated/server";

import { schoolEnrollmentRoleType } from "./schema";

import { assertAuthenticated, getCurrentUser } from "./users";
import { assertSchoolManager } from "./schools";

export const assertSchoolEnrollmentAccess = internalQuery({
  args: { enrollmentId: v.id("schoolEnrollments") },
  async handler(ctx, args) {
    const enrollment = await ctx.db.get(args.enrollmentId);
    if (!enrollment) return null;

    const user = await getCurrentUser(ctx, {});

    if (!user) return null;

    if (user._id === enrollment.userId) return enrollment;

    const school = await assertSchoolManager(ctx, {
      schoolId: enrollment.schoolId,
    });

    if (!school) return null;

    return enrollment;
  },
});

export const createScoolEnrollment = internalMutation({
  args: {
    schoolId: v.id("schools"),
    role: schoolEnrollmentRoleType,
  },
  async handler(ctx, args) {
    const user = await assertAuthenticated(ctx, {});

    const enrollment = await getSchoolEnrollment(ctx, {
      schoolId: args.schoolId,
      userId: user._id,
    });

    if (enrollment) throw new ConvexError("Already enrolled");

    await ctx.db.insert("schoolEnrollments", {
      userId: user._id,
      schoolId: args.schoolId,
      role: args.role,
    });
  },
});

export const getSchoolEnrollment = internalQuery({
  args: {
    userId: v.id("users"),
    schoolId: v.id("schools"),
  },
  async handler(ctx, args) {
    const enrollment = await ctx.db
      .query("schoolEnrollments")
      .withIndex("by_schoolId_userId", (q) =>
        q.eq("schoolId", args.schoolId).eq("userId", args.userId)
      )
      .first();

    return enrollment;
  },
});

export const deleteSchoolEnrollment = mutation({
  args: { enrollmentId: v.id("schoolEnrollments") },
  async handler(ctx, args) {
    const enrollment = await assertSchoolEnrollmentAccess(ctx, {
      enrollmentId: args.enrollmentId,
    });

    if (!enrollment)
      throw new ConvexError("You are not authorized to delete this enrollment");

    await ctx.db.delete(enrollment._id);
  },
});

export const deleteSchoolEnrollments = mutation({
  args: { enrollmentIds: v.array(v.id("schoolEnrollments")) },
  async handler(ctx, args) {
    const promises = args.enrollmentIds.map((enrollmentId) =>
      deleteSchoolEnrollment(ctx, { enrollmentId })
    );

    await Promise.all(promises);
  },
});
