import { ConvexError, v } from "convex/values";
import { internalQuery, mutation, query } from "./_generated/server";

import { assertAuthenticated, getUserById } from "./users";
import {
  createMembership,
  getUserMemberships,
  getSchoolMemberships,
} from "./schoolMemberships";
import { schoolEnrollmentRoleType } from "./schema";

export const createSchool = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    isPublic: v.boolean(),
  },
  async handler(ctx, args) {
    const user = await assertAuthenticated(ctx, {});

    const schoolId = await ctx.db.insert("schools", {
      name: args.name,
      description: args.description,
      isPublic: args.isPublic,
      creatorId: user._id,
      image: "/assets/school.jpeg",
    });

    await createMembership(ctx, {
      schoolId: schoolId,
      userId: user._id,
      role: "manager",
    });
  },
});

export const getUserSchools = query({
  async handler(ctx) {
    const memberships = await getUserMemberships(ctx, {});

    const schools = await Promise.all(
      memberships.map(async (membership) => {
        const school = await getSchool(ctx, {
          schoolId: membership.schoolId,
        });

        if (!school) return;

        return { role: membership.role, ...school };
      })
    );

    return schools.filter((school) => school !== undefined);
  },
});

export const getPublicSchools = query({
  async handler(ctx) {
    await assertAuthenticated(ctx, {});

    const schools = await ctx.db
      .query("schools")
      .filter((q) => q.eq(q.field("isPublic"), true))
      .collect();

    return schools;
  },
});

export const getSchool = query({
  args: {
    schoolId: v.id("schools"),
  },
  async handler(ctx, args) {
    const school = await ctx.db
      .query("schools")
      .withIndex("by_id", (q) => q.eq("_id", args.schoolId))
      .first();

    if (!school) return;

    return school;
  },
});

export const deleteSchool = mutation({
  args: {
    schoolId: v.id("schools"),
  },
  async handler(ctx, args) {
    const school = await assertSchoolOwner(ctx, { schoolId: args.schoolId });

    const memberships = await getSchoolMemberships(ctx, {
      schoolId: args.schoolId,
    });

    await Promise.all(
      memberships.map(async (membership) => {
        await ctx.db.delete(membership._id);
      })
    );

    await ctx.db.delete(school._id);
  },
});

export const updateSchool = mutation({
  args: {
    schoolId: v.id("schools"),
    image: v.optional(v.string()),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    isPublic: v.optional(v.boolean()),
  },
  async handler(ctx, args) {
    const school = await assertSchoolOwner(ctx, { schoolId: args.schoolId });

    await ctx.db.patch(school._id, {
      image: args.image ?? school.image,
      name: args.name ?? school.name,
      description: args.description ?? school.description,
      isPublic: args.isPublic ?? school.isPublic,
    });
  },
});

export const assertSchoolOwner = internalQuery({
  args: {
    schoolId: v.id("schools"),
  },
  async handler(ctx, args) {
    const user = await assertAuthenticated(ctx, {});

    const school = await ctx.db
      .query("schools")
      .withIndex("by_id", (q) => q.eq("_id", args.schoolId))
      .first();

    if (!school) throw new ConvexError("Could not find school");

    if (school.creatorId !== user._id) throw new ConvexError("Unauthorized");

    return school;
  },
});

export const enroll = mutation({
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

export const getEnrollments = query({
  args: { schoolId: v.id("schools") },
  async handler(ctx, args) {
    const enrollments = await ctx.db
      .query("schoolEnrollments")
      .withIndex("by_schoolId", (q) => q.eq("schoolId", args.schoolId))
      .collect();

    const enrollmentsWithUserData = await Promise.all(
      enrollments.map(async (enrollment) => {
        const user = await getUserById(ctx, { userId: enrollment.userId });

        return {
          ...enrollment,
          user,
        };
      })
    );

    return enrollmentsWithUserData.filter(
      (enrollment) => enrollment !== undefined
    );
  },
});

export const deleteEnrollment = mutation({
  args: {
    schoolId: v.id("schools"),
    userId: v.id("users"),
  },
  async handler(ctx, args) {
    await assertSchoolOwner(ctx, { schoolId: args.schoolId });

    const enrollment = await ctx.db
      .query("schoolEnrollments")
      .withIndex("by_schoolId_userId", (q) =>
        q.eq("schoolId", args.schoolId).eq("userId", args.userId)
      )
      .first();

    if (!enrollment) return;

    await ctx.db.delete(enrollment._id);
  },
});

export const deleteEnrollments = mutation({
  args: {
    enrollmentIds: v.array(v.id("schoolEnrollments")),
  },
  async handler(ctx, args) {
    const deletionPromises = args.enrollmentIds.map(async (enrollmentId) => {
      await ctx.db.delete(enrollmentId);
    });

    await Promise.all(deletionPromises);
  },
});

export const acceptEnrollments = mutation({
  args: {
    enrollmentIds: v.array(v.id("schoolEnrollments")),
  },
  async handler(ctx, args) {
    const creationPromises = args.enrollmentIds.map(async (enrollmentId) => {
      const enrollment = await ctx.db
        .query("schoolEnrollments")
        .withIndex("by_id", (q) => q.eq("_id", enrollmentId))
        .first();

      if (!enrollment) return;

      await createMembership(ctx, {
        schoolId: enrollment.schoolId,
        userId: enrollment.userId,
        role: "student",
      });

      await ctx.db.delete(enrollment._id);
    });

    await Promise.all(creationPromises);
  },
});
