import { ConvexError, v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";

import { assertAuthenticated, getCurrentUser, getUserById } from "./users";
import { getSchoolMembership } from "./schoolMemberships";
import {
  createCourseMembership,
  deleteCourseMembership,
  getCourseMembership,
  getUserCourseMemberships,
} from "./courseMemberships";
import {
  createCourseEnrollment,
  deleteCourseEnrollment,
} from "./courseEnrollments";

export const createCourse = mutation({
  args: {
    schoolId: v.id("schools"),
    name: v.string(),
    description: v.string(),
  },
  async handler(ctx, args) {
    const user = await assertAuthenticated(ctx, {});

    const membership = await getSchoolMembership(ctx, {
      schoolId: args.schoolId,
      userId: user._id,
    });

    if (membership?.role !== "teacher")
      throw new ConvexError("Unauthorized to create a course");

    const courseId = await ctx.db.insert("courses", {
      schoolId: args.schoolId,
      name: args.name,
      description: args.description,
      image: "/assets/course.svg",
    });

    await ctx.db.insert("courseMemberships", {
      userId: user._id,
      courseId: courseId,
      role: "manager",
    });
  },
});

export const getUserCourses = query({
  args: {
    userId: v.id("users"),
    schoolId: v.id("schools"),
  },
  async handler(ctx, args) {
    const memberships = await getUserCourseMemberships(ctx, {
      schoolId: args.schoolId,
      userId: args.userId,
    });

    const courses = await Promise.all(
      memberships.map(async (membership) => {
        const course = await ctx.db.get(membership.courseId);

        return course ? { membership, course } : null;
      })
    );

    return courses.filter((course) => course !== null);
  },
});

export const getCourse = query({
  args: {
    courseId: v.id("courses"),
  },
  async handler(ctx, args) {
    const course = await ctx.db.get(args.courseId);
    return course;
  },
});

export const updateCourse = mutation({
  args: {
    courseId: v.id("courses"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    info: v.optional(v.string()),
  },
  async handler(ctx, args) {
    const course = await assertCourseManager(ctx, {
      courseId: args.courseId,
    });

    if (!course) throw new ConvexError("Unauthorized to update this course");

    await ctx.db.patch(args.courseId, {
      name: args.name ?? course.name,
      description: args.description ?? course.description,
      info: args.info ?? course.info,
    });
  },
});

export const assertCourseManager = query({
  args: {
    courseId: v.id("courses"),
  },
  async handler(ctx, args) {
    const user = await getCurrentUser(ctx, {});

    if (!user) return null;

    const course = await getCourse(ctx, { courseId: args.courseId });

    if (!course) return null;

    const membership = await getCourseMembership(ctx, {
      courseId: args.courseId,
      userId: user._id,
    });

    if (membership?.role !== "manager") return null;

    return course;
  },
});

export const deleteCourse = mutation({
  args: {
    courseId: v.id("courses"),
  },
  async handler(ctx, args) {
    const user = await assertAuthenticated(ctx, {});

    const course = await ctx.db.get(args.courseId);
    if (!course) throw new ConvexError("Course not found");

    // Check if user is the course manager
    const courseMembership = await getCourseMembership(ctx, {
      courseId: args.courseId,
      userId: user._id,
    });
    const isCourseOwner = courseMembership?.role === "manager";

    // Check if user is the school manager
    const schoolMembership = await getSchoolMembership(ctx, {
      schoolId: course.schoolId,
      userId: user._id,
    });
    const isSchoolOwner = schoolMembership?.role === "manager";

    if (!isCourseOwner && !isSchoolOwner) {
      throw new ConvexError("Unauthorized to delete this course");
    }

    const [memberships, enrollments] = await Promise.all([
      getCourseMemberships(ctx, { courseId: args.courseId }),
      getCourseEnrollments(ctx, { courseId: args.courseId }),
    ]);

    await Promise.all([
      memberships.map((membership) => {
        ctx.db.delete(membership._id);
      }),
      enrollments.map((enrollment) => {
        ctx.db.delete(enrollment._id);
      }),
    ]);

    await ctx.db.delete(args.courseId);
  },
});

export const getCourseMemberships = query({
  args: {
    courseId: v.id("courses"),
  },
  async handler(ctx, args) {
    const memberships = await ctx.db
      .query("courseMemberships")
      .withIndex("by_courseId", (q) => q.eq("courseId", args.courseId))
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

export const getCourseEnrollments = query({
  args: {
    courseId: v.id("courses"),
  },
  async handler(ctx, args) {
    const enrollments = await ctx.db
      .query("courseEnrollments")
      .withIndex("by_courseId", (q) => q.eq("courseId", args.courseId))
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

export const enroll = mutation({
  args: {
    courseId: v.id("courses"),
  },
  async handler(ctx, args) {
    const user = await assertAuthenticated(ctx, {});

    await createCourseEnrollment(ctx, {
      courseId: args.courseId,
      userId: user._id,
    });
  },
});

export const exit = mutation({
  args: {
    membershipId: v.id("courseMemberships"),
  },
  async handler(ctx, args) {
    await deleteCourseMembership(ctx, { membershipId: args.membershipId });
  },
});

export const approveEnrollment = internalMutation({
  args: {
    enrollmentId: v.id("courseEnrollments"),
  },
  async handler(ctx, args) {
    const enrollment = await ctx.db.get(args.enrollmentId);

    if (!enrollment) throw new ConvexError("Enrollment not found");

    await createCourseMembership(ctx, {
      courseId: enrollment.courseId,
      userId: enrollment.userId,
      role: "student",
    });

    await deleteCourseEnrollment(ctx, { enrollmentId: enrollment._id });
  },
});

export const approveEnrollments = mutation({
  args: {
    enrollmentIds: v.array(v.id("courseEnrollments")),
  },
  async handler(ctx, args) {
    const promises = args.enrollmentIds.map((enrollmentId) =>
      approveEnrollment(ctx, { enrollmentId })
    );

    await Promise.all(promises);
  },
});

export const getStudentCourses = query({
  args: {
    schoolId: v.id("schools"),
    userId: v.id("users"),
  },
  async handler(ctx, args) {
    const memberships = await ctx.db
      .query("courseMemberships")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();

    const courses = await Promise.all(
      memberships.map(async (membership) => {
        const course = await getCourse(ctx, { courseId: membership.courseId });
        return { course, membership };
      })
    );

    return courses;
  },
});
