import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { assertAuthenticated, getCurrentUser } from "./users";
import {
  createCourseMembership,
  getCourseMembership,
} from "./courseMemberships";
import { getMembership } from "./schoolMemberships";

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
    const course = await assertCourseOwner(ctx, {
      courseId: args.courseId,
    });

    if (!course)
      throw new ConvexError("You are not authorized to delete this course");

    await ctx.db.delete(args.courseId);
  },
});
