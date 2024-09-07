import { ConvexError, v } from "convex/values";
import { eventType } from "./schema";
import { mutation } from "./_generated/server";
import { assertCourseOwner } from "./courses";

export const createCourseEvent = mutation({
  args: {
    courseId: v.id("courses"),
    name: v.string(),
    type: eventType,
    description: v.string(),
    startDate: v.number(),
    endDate: v.number(),
  },
  async handler(ctx, args) {
    const course = await assertCourseOwner(ctx, { courseId: args.courseId });

    if (!course)
      throw new ConvexError("Unauthorized to create event for this course");

    await ctx.db.insert("courseEvents", {
      courseId: args.courseId,
      name: args.name,
      type: args.type,
      description: args.description,
      startDate: args.startDate,
      endDate: args.endDate,
    });
  },
});
