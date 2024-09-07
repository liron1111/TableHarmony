import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { assertAuthenticated, getCurrentUser, getUserById } from "./users";
import {
  createCourseMembership,
  deleteCourseMembership,
  getCourseMembership,
} from "./courseMemberships";
import { getMembership } from "./schoolMemberships";
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

    const membership = await getMembership(ctx, {
      schoolId: args.schoolId,
      userId: user._id,
    });

    if (membership?.role !== "teacher")
      throw new ConvexError("You are not authorized to create a course");

    const courseId = await ctx.db.insert("courses", {
      schoolId: args.schoolId,
      creatorId: user._id,
      name: args.name,
      description: args.description,
      image: "/assets/course.svg",
    });

    await createCourseMembership(ctx, {
      courseId: courseId,
      userId: user._id,
      role: "manager",
    });
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
    const course = await assertCourseOwner(ctx, {
      courseId: args.courseId,
    });

    if (!course)
      throw new ConvexError("You are not authorized to update this course");

    await ctx.db.patch(args.courseId, {
      name: args.name ?? course.name,
      description: args.description ?? course.description,
      info: args.info ?? course.info,
    });
  },
});
export const assertCourseOwner = query({
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

    // Check if the user is the course manager
    const courseMembership = await getCourseMembership(ctx, {
      courseId: args.courseId,
      userId: user._id,
    });
    const isCourseOwner = courseMembership?.role === "manager";

    // Check if the user is the school manager
    const schoolMembership = await getMembership(ctx, {
      schoolId: course.schoolId,
      userId: user._id,
    });
    const isSchoolOwner = schoolMembership?.role === "manager";

    if (!isCourseOwner && !isSchoolOwner) {
      throw new ConvexError("You are not authorized to delete this course");
    }

    await ctx.db.delete(args.courseId);
  },
});

export const getMemberships = query({
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

export const getEnrollments = query({
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

export const enrollCourse = mutation({
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

export const approveEnrollments = mutation({
  args: {
    enrollmentIds: v.array(v.id("courseEnrollments")),
  },
  async handler(ctx, args) {
    const enrollments = args.enrollmentIds;

    const promises = enrollments.map(async (enrollmentId) => {
      const enrollment = await ctx.db.get(enrollmentId);

      if (!enrollment) throw new ConvexError("Enrollment not found");

      await createCourseMembership(ctx, {
        courseId: enrollment.courseId,
        userId: enrollment.userId,
        role: "student",
      });

      await deleteCourseEnrollment(ctx, { enrollmentId });
    });

    await Promise.all(promises);
  },
});

export const deleteEnrollments = mutation({
  args: {
    enrollmentIds: v.array(v.id("courseEnrollments")),
  },
  async handler(ctx, args) {
    const enrollments = args.enrollmentIds;

    const promises = enrollments.map(async (enrollmentId) => {
      await deleteCourseEnrollment(ctx, { enrollmentId });
    });

    await Promise.all(promises);
  },
});

export const deleteMemberships = mutation({
  args: {
    membershipIds: v.array(v.id("courseMemberships")),
  },
  async handler(ctx, args) {
    const memberships = args.membershipIds;

    const promises = memberships.map(async (membershipId) => {
      await deleteCourseMembership(ctx, { membershipId });
    });

    await Promise.all(promises);
  },
});
