import { ConvexError, v } from "convex/values";
import {
  internalMutation,
  internalQuery,
  mutation,
  query,
} from "./_generated/server";

import {
  createMembership,
  deleteMembership,
  deleteMemberships,
  getMembership,
  getUserMemberships,
} from "./schoolMemberships";
import { assertAuthenticated, getUserById } from "./users";
import { schoolEnrollmentRoleType } from "./schema";
import {
  createEnrollment,
  deleteEnrollment,
  deleteEnrollments,
} from "./schoolEnrollments";

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
      userId: user._id,
      schoolId: schoolId,
      role: "manager",
    });
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

    if (!school) return null;

    return school;
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

        return school ? { ...school, membership } : null;
      })
    );

    return schools.filter((school) => school !== null);
  },
});

export const getPublicSchools = query({
  async handler(ctx) {
    const schools = await ctx.db
      .query("schools")
      .filter((q) => q.eq(q.field("isPublic"), true))
      .collect();

    return schools;
  },
});

export const assertSchoolOwner = internalQuery({
  args: {
    schoolId: v.id("schools"),
  },
  async handler(ctx, args) {
    const user = await assertAuthenticated(ctx, {});
    const school = await getSchool(ctx, { schoolId: args.schoolId });

    if (school?.creatorId !== user._id) return null;

    return school;
  },
});

export const updateSchool = mutation({
  args: {
    schoolId: v.id("schools"),
    image: v.optional(v.string()),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    isPublic: v.optional(v.boolean()),
    info: v.optional(v.string()),
  },
  async handler(ctx, args) {
    const school = await assertSchoolOwner(ctx, { schoolId: args.schoolId });

    if (!school) throw new ConvexError("You do not have access to this school");

    await ctx.db.patch(school._id, {
      image: args.image ?? school.image,
      name: args.name ?? school.name,
      description: args.description ?? school.description,
      isPublic: args.isPublic ?? school.isPublic,
      info: args.info ?? school.info,
    });
  },
});

export const deleteSchool = mutation({
  args: {
    schoolId: v.id("schools"),
  },
  async handler(ctx, args) {
    const school = await assertSchoolOwner(ctx, { schoolId: args.schoolId });

    if (!school) throw new ConvexError("You do not have access to this school");

    const memberships = await getSchoolMemberships(ctx, {
      schoolId: args.schoolId,
    });

    await deleteMemberships(ctx, {
      membershipIds: memberships.map((membership) => membership._id),
    });

    const enrollments = await getSchoolEnrollments(ctx, {
      schoolId: args.schoolId,
    });

    await deleteEnrollments(ctx, {
      enrollmentIds: enrollments.map((enrollment) => enrollment._id),
    });

    await ctx.db.delete(school._id);
  },
});

export const getSchoolMemberships = query({
  args: { schoolId: v.id("schools") },
  async handler(ctx, args) {
    const memberships = await ctx.db
      .query("schoolMemberships")
      .withIndex("by_schoolId", (q) => q.eq("schoolId", args.schoolId))
      .collect();

    const membershipsWithUserInfo = await Promise.all(
      memberships.map(async (membership) => {
        const user = await getUserById(ctx, { userId: membership.userId });
        return user ? { ...membership, user } : null;
      })
    );

    return membershipsWithUserInfo.filter((membership) => membership !== null);
  },
});

export const getSchoolEnrollments = query({
  args: { schoolId: v.id("schools") },
  async handler(ctx, args) {
    const enrollments = await ctx.db
      .query("schoolEnrollments")
      .withIndex("by_schoolId", (q) => q.eq("schoolId", args.schoolId))
      .collect();

    const enrollmentsWithUserInfo = await Promise.all(
      enrollments.map(async (enrollment) => {
        const user = await getUserById(ctx, { userId: enrollment.userId });
        return user ? { ...enrollment, user } : null;
      })
    );

    return enrollmentsWithUserInfo.filter((enrollment) => enrollment !== null);
  },
});

export const exitSchool = mutation({
  args: { schoolId: v.id("schools") },
  async handler(ctx, args) {
    const user = await assertAuthenticated(ctx, {});

    const membership = await getMembership(ctx, {
      schoolId: args.schoolId,
      userId: user._id,
    });

    if (!membership) throw new ConvexError("Could not find membership");

    await deleteMembership(ctx, { membershipId: membership._id });
  },
});

export const enroll = mutation({
  args: {
    schoolId: v.id("schools"),
    role: schoolEnrollmentRoleType,
  },
  async handler(ctx, args) {
    await createEnrollment(ctx, {
      schoolId: args.schoolId,
      role: args.role,
    });
  },
});

export const approveEnrollments = mutation({
  args: {
    enrollmentIds: v.array(v.id("schoolEnrollments")),
  },
  async handler(ctx, args) {
    const enrollments = args.enrollmentIds;

    const promises = enrollments.map(async (enrollmentId) => {
      const enrollment = await ctx.db.get(enrollmentId);

      if (!enrollment) throw new ConvexError("Could not find enrollment");

      await createMembership(ctx, {
        schoolId: enrollment.schoolId,
        userId: enrollment.userId,
        role: enrollment.role,
      });

      await deleteEnrollment(ctx, { enrollmentId });
    });

    await Promise.all(promises);
  },
});
