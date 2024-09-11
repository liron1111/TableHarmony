import { v } from "convex/values";
import {
  internalMutation,
  internalQuery,
  mutation,
  query,
} from "./_generated/server";
import { ConvexError } from "convex/values";

import { schoolEnrollmentRoleType } from "./schema";

import { assertAuthenticated, getCurrentUser, getUserById } from "./users";
import {
  createSchoolMembership,
  deleteSchoolMembership,
  getSchoolMembership,
  getUserSchoolMemberships,
} from "./schoolMemberships";
import { createScoolEnrollment } from "./schoolEnrollments";

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
      image: "/assets/school.svg",
      isPublic: args.isPublic,
    });

    await ctx.db.insert("schoolMemberships", {
      userId: user._id,
      schoolId: schoolId,
      role: "manager",
      boardingComplete: true,
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
    const memberships = await getUserSchoolMemberships(ctx, {});

    const schools = await Promise.all(
      memberships.map(async (membership) => {
        const school = await ctx.db.get(membership.schoolId);
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

export const assertSchoolManager = internalQuery({
  args: {
    schoolId: v.id("schools"),
  },
  async handler(ctx, args) {
    const user = await getCurrentUser(ctx, {});
    if (!user) return null;

    const school = await ctx.db.get(args.schoolId);
    if (!school) return null;

    const schoolMembership = await getSchoolMembership(ctx, {
      schoolId: school._id,
      userId: user._id,
    });

    if (schoolMembership?.role !== "manager") return null;

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
    const school = await assertSchoolManager(ctx, { schoolId: args.schoolId });

    if (!school)
      throw new ConvexError("You are not authorized to update this school");

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
    const school = await assertSchoolManager(ctx, { schoolId: args.schoolId });

    if (!school)
      throw new ConvexError("You are not authorized to delete this school");

    const [memberships, enrollments, semesters] = await Promise.all([
      getSchoolMemberships(ctx, { schoolId: school._id }),
      getSchoolEnrollments(ctx, { schoolId: school._id }),
      getSchoolSemesters(ctx, { schoolId: school._id }),
    ]);

    await Promise.all([
      memberships.map(
        async (membership) =>
          await deleteSchoolMembership(ctx, { membershipId: membership._id })
      ),
      enrollments.map((enrollment) => ctx.db.delete(enrollment._id)),
      semesters.map((semester) => ctx.db.delete(semester._id)),
    ]);

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

export const getSchoolCourses = query({
  args: {
    schoolId: v.id("schools"),
  },
  async handler(ctx, args) {
    const courses = await ctx.db
      .query("courses")
      .withIndex("by_schoolId", (q) => q.eq("schoolId", args.schoolId))
      .collect();

    return courses;
  },
});

export const getSchoolSemesters = query({
  args: {
    schoolId: v.id("schools"),
  },
  async handler(ctx, args) {
    const semesters = await ctx.db
      .query("semesters")
      .withIndex("by_schoolId", (q) => q.eq("schoolId", args.schoolId))
      .collect();

    return semesters;
  },
});

export const getCurrentSemester = query({
  args: {
    schoolId: v.id("schools"),
  },
  async handler(ctx, args) {
    const now = Date.now();

    const semester = await ctx.db
      .query("semesters")
      .withIndex("by_schoolId", (q) => q.eq("schoolId", args.schoolId))
      .filter((q) =>
        q.and(q.gte(q.field("from"), now), q.lte(q.field("to"), now))
      )
      .first();

    return semester;
  },
});

export const exit = mutation({
  args: { schoolId: v.id("schools") },
  async handler(ctx, args) {
    const user = await assertAuthenticated(ctx, {});

    const membership = await getSchoolMembership(ctx, {
      schoolId: args.schoolId,
      userId: user._id,
    });

    if (!membership)
      throw new ConvexError("You are not a member of this school");

    await deleteSchoolMembership(ctx, { membershipId: membership._id });
  },
});

export const enroll = mutation({
  args: {
    schoolId: v.id("schools"),
    role: schoolEnrollmentRoleType,
  },
  async handler(ctx, args) {
    await createScoolEnrollment(ctx, {
      schoolId: args.schoolId,
      role: args.role,
    });
  },
});

export const approveEnrollment = internalMutation({
  args: {
    enrollmentId: v.id("schoolEnrollments"),
  },
  async handler(ctx, args) {
    const enrollment = await ctx.db.get(args.enrollmentId);

    if (!enrollment) throw new ConvexError("Enrollment not found");

    const school = await assertSchoolManager(ctx, {
      schoolId: enrollment.schoolId,
    });

    if (!school)
      throw new ConvexError("Unauthorized: Cannot approve school enrollment");

    await createSchoolMembership(ctx, {
      schoolId: school._id,
      userId: enrollment.userId,
      role: enrollment.role,
    });

    await ctx.db.delete(enrollment._id);
  },
});

export const approveEnrollments = mutation({
  args: {
    enrollmentIds: v.array(v.id("schoolEnrollments")),
  },
  async handler(ctx, args) {
    const promises = args.enrollmentIds.map((enrollmentId) =>
      approveEnrollment(ctx, { enrollmentId })
    );

    await Promise.all(promises);
  },
});
