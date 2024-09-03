import { v } from "convex/values";
import { internalQuery, mutation, query } from "./_generated/server";

import {
  createMembership,
  deleteMembership,
  deleteMemberships,
  getMembership,
  getUserMemberships,
} from "./schoolMemberships";
import { assertAuthenticated, getCurrentUser, getUserById } from "./users";
import { schoolEnrollmentRoleType } from "./schema";
import {
  createEnrollment,
  deleteEnrollment,
  deleteEnrollments,
} from "./schoolEnrollments";
import { AuthorizationError, NotFoundError } from "@/utils/errors";

export const createSchool = mutation({
  args: {
    name: v.string(),
    description: v.string(),
  },
  async handler(ctx, args) {
    const user = await assertAuthenticated(ctx, {});

    const schoolId = await ctx.db.insert("schools", {
      name: args.name,
      description: args.description,
      creatorId: user._id,
      image: "/assets/school.svg",
      isPublic: false,
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
    const user = await getCurrentUser(ctx, {});

    if (!user) return null;

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

    if (!school) throw new AuthorizationError();

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

    if (!school) throw new AuthorizationError();

    const [memberships, enrollments] = await Promise.all([
      getSchoolMemberships(ctx, { schoolId: school._id }),
      getSchoolEnrollments(ctx, { schoolId: school._id }),
    ]);

    await Promise.all([
      deleteMemberships(ctx, {
        membershipIds: memberships.map((membership) => membership._id),
      }),
      deleteEnrollments(ctx, {
        enrollmentIds: enrollments.map((enrollment) => enrollment._id),
      }),
      ctx.db.delete(school._id),
    ]);
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

    if (!membership) throw new AuthorizationError();

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

      if (!enrollment) throw new NotFoundError();

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
