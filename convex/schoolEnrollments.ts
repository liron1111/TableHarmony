import { ConvexError, v } from "convex/values";
import { internalMutation, internalQuery, mutation } from "./_generated/server";

import { schoolEnrollmentRoleType } from "./schema";
import { assertAuthenticated, getCurrentUser } from "./users";
import { getSchool } from "./schools";

export const assertEnrollmentAccess = internalQuery({
  args: { enrollmentId: v.id("schoolEnrollments") },
  async handler(ctx, args) {
    const enrollment = await ctx.db.get(args.enrollmentId);
    if (!enrollment) return null;

    const user = await getCurrentUser(ctx, {});
    const school = await getSchool(ctx, { schoolId: enrollment.schoolId });

    if (!user) return null;

    if (school?.creatorId !== user._id) return null;

    return enrollment;
  },
});

export const createEnrollment = internalMutation({
  args: {
    schoolId: v.id("schools"),
    role: schoolEnrollmentRoleType,
  },
  async handler(ctx, args) {
    const user = await assertAuthenticated(ctx, {});

    const enrollment = await ctx.db
      .query("schoolEnrollments")
      .withIndex("by_schoolId_userId", (q) =>
        q.eq("schoolId", args.schoolId).eq("userId", user._id)
      )
      .first();

    if (enrollment) throw new ConvexError("Already enrolled");

    await ctx.db.insert("schoolEnrollments", {
      userId: user._id,
      schoolId: args.schoolId,
      role: args.role,
    });
  },
});

export const deleteEnrollment = internalMutation({
  args: { enrollmentId: v.id("schoolEnrollments") },
  async handler(ctx, args) {
    const enrollment = await assertEnrollmentAccess(ctx, {
      enrollmentId: args.enrollmentId,
    });

    if (!enrollment) throw new ConvexError("Enrollment not found");

    await ctx.db.delete(enrollment._id);
  },
});

export const deleteEnrollments = mutation({
  args: { enrollmentIds: v.array(v.id("schoolEnrollments")) },
  async handler(ctx, args) {
    const enrollments = args.enrollmentIds;

    const deletionPromises = enrollments.map((enrollment) =>
      deleteEnrollment(ctx, { enrollmentId: enrollment })
    );

    await Promise.all(deletionPromises);
  },
});
