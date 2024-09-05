import { v } from "convex/values";
import { assertSchoolOwner } from "./schools";
import { mutation, query } from "./_generated/server";
import { AuthorizationError, NotFoundError } from "@/utils/errors";
import {
  createMembership,
  deleteMembership,
  getMembership,
} from "./classroomMemberships";
import { assertAuthenticated } from "./users";

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

export const exitClassroom = mutation({
  args: {
    classroomId: v.id("classrooms"),
  },
  async handler(ctx, args) {
    const user = await assertAuthenticated(ctx, {});

    const membership = await getMembership(ctx, {
      classroomId: args.classroomId,
      userId: user._id,
    });

    if (!membership) throw new NotFoundError();

    await deleteMembership(ctx, {
      membershipId: membership._id,
    });
  },
});

export const joinClassroom = mutation({
  args: {
    classroomId: v.id("classrooms"),
  },
  async handler(ctx, args) {
    const user = await assertAuthenticated(ctx, {});

    const classroom = await ctx.db.get(args.classroomId);

    if (!classroom) throw new NotFoundError();

    const membership = await getMembership(ctx, {
      classroomId: args.classroomId,
      userId: user._id,
    });

    if (membership) throw new AuthorizationError();

    await createMembership(ctx, {
      classroomId: args.classroomId,
      userId: user._id,
    });
  },
});
