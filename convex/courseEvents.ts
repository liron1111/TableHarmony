import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import { eventType } from "./schema";
import { assertCourseManager } from "./courses";
import { getCurrentSemester } from "./schools";

export const createCourseEvent = mutation({
  args: {
    courseId: v.id("courses"),
    title: v.string(),
    description: v.string(),
    type: eventType,
    date: v.number(),
  },
  async handler(ctx, args) {
    const course = await assertCourseManager(ctx, {
      courseId: args.courseId,
    });

    if (!course) throw new ConvexError("Unauthorized: Cannot create event");

    const semester = await getCurrentSemester(ctx, {
      schoolId: course.schoolId,
    });

    if (!semester)
      throw new ConvexError("Cannot create an event not during a semester");

    if (args.date > semester.to)
      throw new ConvexError("Semester will be over IDK");

    await ctx.db.insert("courseEvents", {
      courseId: args.courseId,
      title: args.title,
      description: args.description,
      type: args.type,
      date: args.date,
    });
  },
});
