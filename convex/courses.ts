import { ConvexError, v } from "convex/values";
import {
  internalMutation,
  internalQuery,
  mutation,
  query,
} from "./_generated/server";

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
import { trackEvent } from "./events";
import { deleteAssignmentCascade } from "./courseAssignments";

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
      throw new ConvexError("Unauthorized: Cannot create a course");

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

    trackEvent(ctx, {
      objectId: args.schoolId,
      key: "course created",
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
    image: v.optional(v.string()),
  },
  async handler(ctx, args) {
    const course = await assertCourseManager(ctx, {
      courseId: args.courseId,
    });

    if (!course) throw new ConvexError("Unauthorized: Cannot update course");

    await ctx.db.patch(args.courseId, {
      name: args.name ?? course.name,
      description: args.description ?? course.description,
      info: args.info ?? course.info,
      image: args.image ?? course.image,
    });

    trackEvent(ctx, {
      objectId: args.courseId,
      key: "course updated",
    });
  },
});

export const assertCourseManager = internalQuery({
  args: {
    courseId: v.id("courses"),
  },
  async handler(ctx, args) {
    const user = await getCurrentUser(ctx, {});

    if (!user) return null;

    const course = await ctx.db.get(args.courseId);

    if (!course) return null;

    const membership = await getCourseMembership(ctx, {
      courseId: course._id,
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
    const course = await ctx.db.get(args.courseId);

    if (!course) throw new ConvexError("Course not found");

    const user = await assertAuthenticated(ctx, {});

    const [courseMembership, schoolMembership] = await Promise.all([
      getCourseMembership(ctx, {
        courseId: course._id,
        userId: user._id,
      }),
      getSchoolMembership(ctx, {
        schoolId: course.schoolId,
        userId: user._id,
      }),
    ]);

    if (
      courseMembership?.role !== "manager" &&
      schoolMembership?.role !== "manager"
    )
      throw new ConvexError("Unauthorized: Cannot delete course");

    await deleteCourseCascade(ctx, { courseId: course._id });
  },
});

export const deleteCourseCascade = internalMutation({
  args: {
    courseId: v.id("courses"),
  },
  async handler(ctx, args) {
    const course = await ctx.db.get(args.courseId);

    if (!course) throw new ConvexError("Course not found");

    const [memberships, enrollments, classes, assignments] = await Promise.all([
      getCourseMemberships(ctx, { courseId: args.courseId }),
      getCourseEnrollments(ctx, { courseId: args.courseId }),
      getCourseClasses(ctx, { courseId: args.courseId }),
      getCourseAssignments(ctx, { courseId: args.courseId }),
    ]);

    await Promise.all([
      ...memberships.map((membership) => ctx.db.delete(membership._id)),
      ...enrollments.map((enrollment) => ctx.db.delete(enrollment._id)),
      ...classes.map((courseClass) => ctx.db.delete(courseClass._id)),
      ...assignments.map((assignment) =>
        deleteAssignmentCascade(ctx, { assignmentId: assignment._id })
      ),
    ]);

    await ctx.db.delete(args.courseId);

    trackEvent(ctx, {
      objectId: course.schoolId,
      key: "course deleted",
    });
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

export const getCourseClasses = query({
  args: {
    courseId: v.id("courses"),
  },
  async handler(ctx, args) {
    const classes = await ctx.db
      .query("classes")
      .withIndex("by_courseId", (q) => q.eq("courseId", args.courseId))
      .collect();

    return classes;
  },
});

export const getCourseAssignments = query({
  args: {
    courseId: v.id("courses"),
  },
  async handler(ctx, args) {
    const assignments = await ctx.db
      .query("courseAssignments")
      .withIndex("by_courseId", (q) => q.eq("courseId", args.courseId))
      .collect();

    return assignments;
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

    trackEvent(ctx, {
      objectId: args.courseId,
      key: "enrolled",
    });
  },
});

export const exit = mutation({
  args: {
    membershipId: v.id("courseMemberships"),
  },
  async handler(ctx, args) {
    const membership = await ctx.db.get(args.membershipId);
    if (!membership) throw new ConvexError("Membership not found");

    await deleteCourseMembership(ctx, { membershipId: args.membershipId });

    trackEvent(ctx, {
      objectId: membership.courseId,
      key: "exited",
    });
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

    trackEvent(ctx, {
      objectId: enrollment.courseId,
      key: "enrollment approved",
    });
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
