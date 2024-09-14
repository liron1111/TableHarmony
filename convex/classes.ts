import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import {
  assertCourseManager,
  getCourseClasses,
  getUserCourses,
} from "./courses";
import { dayType } from "./schema";
import { trackEvent } from "./events";

const timeSinceMidnight = (term: number) => {
  const date = new Date(term);
  return (
    1000 * (date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds())
  );
};

function checkOverlap(
  start1: number,
  end1: number,
  start2: number,
  end2: number
): boolean {
  return Math.max(start1, start2) < Math.min(end1, end2);
}

export const createClass = mutation({
  args: {
    courseId: v.id("courses"),
    day: dayType,
    from: v.number(),
    to: v.number(),
  },
  async handler(ctx, args) {
    const course = await assertCourseManager(ctx, { courseId: args.courseId });

    if (!course) throw new ConvexError("Unauthorized: Cannot create class");

    const from = timeSinceMidnight(args.from);
    const to = timeSinceMidnight(args.to);

    if (from >= to) throw new ConvexError("Invalid time range");

    const classes = await getCourseClasses(ctx, { courseId: course._id });

    const overlappingClasses = classes.filter(
      (c) => c.day === args.day && checkOverlap(from, to, c.from, c.to)
    );

    if (overlappingClasses.length > 0)
      throw new ConvexError("Class overlaps with another class");

    await ctx.db.insert("classes", {
      courseId: args.courseId,
      day: args.day,
      from,
      to,
    });

    trackEvent(ctx, {
      key: "class created",
      objectId: course._id,
    });
  },
});

export const updateClass = mutation({
  args: {
    classId: v.id("classes"),
    day: v.optional(dayType),
    from: v.optional(v.number()),
    to: v.optional(v.number()),
  },
  async handler(ctx, args) {
    const courseClass = await ctx.db.get(args.classId);

    if (!courseClass) throw new ConvexError("Class not found");

    const course = await assertCourseManager(ctx, {
      courseId: courseClass.courseId,
    });

    if (!course) throw new ConvexError("Unauthorized: Cannot update class");

    const from = timeSinceMidnight(args.from ?? courseClass.from);
    const to = timeSinceMidnight(args.to ?? courseClass.to);

    if (from >= to) throw new ConvexError("Invalid time range");

    const classes = await getCourseClasses(ctx, { courseId: course._id });

    const overlappingClasses = classes.filter(
      (c) =>
        c._id !== courseClass._id &&
        c.day === (args.day ?? courseClass.day) &&
        checkOverlap(from, to, c.from, c.to)
    );

    if (overlappingClasses.length > 0)
      throw new ConvexError("Class overlaps with another class");

    await ctx.db.patch(courseClass._id, {
      day: args.day ?? courseClass.day,
      from,
      to,
    });

    trackEvent(ctx, {
      key: "class updated",
      objectId: courseClass.courseId,
    });
  },
});

export const deleteClass = mutation({
  args: {
    classId: v.id("classes"),
  },
  async handler(ctx, args) {
    const courseClass = await ctx.db.get(args.classId);

    if (!courseClass) throw new ConvexError("Class not found");

    const course = await assertCourseManager(ctx, {
      courseId: courseClass.courseId,
    });

    if (!course) throw new ConvexError("Unauthorized: Cannot delete class");

    await ctx.db.delete(courseClass._id);

    trackEvent(ctx, {
      key: "class deleted",
      objectId: courseClass.courseId,
    });
  },
});

export const getClass = query({
  args: {
    classId: v.id("classes"),
  },
  async handler(ctx, args) {
    const courseClass = await ctx.db.get(args.classId);

    if (!courseClass) throw new ConvexError("Class not found");

    return courseClass;
  },
});

export const getUserClasses = query({
  args: {
    userId: v.id("users"),
    schoolId: v.id("schools"),
  },
  async handler(ctx, args) {
    const user = await ctx.db.get(args.userId);

    if (!user) throw new ConvexError("User not found");

    const courses = await getUserCourses(ctx, {
      userId: args.userId,
      schoolId: args.schoolId,
    });

    const classes = await Promise.all(
      courses.map(async ({ course }) => {
        const courseClasses = await getCourseClasses(ctx, {
          courseId: course._id,
        });
        return { course, classes: courseClasses };
      })
    );

    return classes;
  },
});
