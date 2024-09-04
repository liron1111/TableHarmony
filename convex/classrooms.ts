import { v } from "convex/values";
import { assertSchoolOwner } from "./schools";
import { mutation, query } from "./_generated/server";
import { AuthorizationError, NotFoundError } from "@/utils/errors";

export const createClassroom = mutation({
  args: {
    schoolId: v.id("schools"),
    name: v.string(),
    description: v.string(),
  },
  async handler(ctx, args) {
    const user = await assertSchoolOwner(ctx, { schoolId: args.schoolId });

    if (!user) throw new AuthorizationError();

    await ctx.db.insert("classrooms", {
      schoolId: args.schoolId,
      name: args.name,
      description: args.description,
      image: "/assets/classroom.svg",
    });
  },
});

export const getSchoolClassrooms = query({
  args: {
    schoolId: v.id("schools"),
  },
  async handler(ctx, args) {
    const classrooms = await ctx.db
      .query("classrooms")
      .withIndex("by_schoolId", (q) => q.eq("schoolId", args.schoolId))
      .collect();

    return classrooms;
  },
});

export const deleteClassroom = mutation({
  args: {
    classroomId: v.id("classrooms"),
  },
  async handler(ctx, args) {
    const classroom = await ctx.db.get(args.classroomId);

    if (!classroom) throw new NotFoundError();

    const user = await assertSchoolOwner(ctx, { schoolId: classroom.schoolId });

    if (!user) throw new AuthorizationError();

    //TODO: delete all classroom members

    await ctx.db.delete(args.classroomId);
  },
});

export const getClassroom = query({
  args: {
    classroomId: v.id("classrooms"),
  },
  async handler(ctx, args) {
    const classroom = await ctx.db.get(args.classroomId);

    return classroom;
  },
});
