import { ConvexError, v } from "convex/values";
import { assertSchoolOwner } from "./schools";
import { internalMutation, mutation, query } from "./_generated/server";
import {
  createClassroomMembership,
  deleteClassroomMembership,
  getClassroomMembership,
} from "./classroomMemberships";
import { assertAuthenticated, getUserById } from "./users";

export const createClassroom = mutation({
  args: {
    schoolId: v.id("schools"),
    name: v.string(),
    description: v.string(),
  },
  async handler(ctx, args) {
    const user = await assertSchoolOwner(ctx, { schoolId: args.schoolId });

    if (!user)
      throw new ConvexError(
        "You are not authorized to create a classroom in this school"
      );

    await ctx.db.insert("classrooms", {
      schoolId: args.schoolId,
      name: args.name,
      description: args.description,
      image: "/assets/classroom.svg",
    });
  },
});

export const deleteClassroom = mutation({
  args: {
    classroomId: v.id("classrooms"),
  },
  async handler(ctx, args) {
    const classroom = await ctx.db.get(args.classroomId);

    if (!classroom) throw new ConvexError("Classroom not found");

    const user = await assertSchoolOwner(ctx, { schoolId: classroom.schoolId });

    if (!user)
      throw new ConvexError("You are not authorized to delete this classroom");

    const [memberships] = await Promise.all([
      getClassroomMemberships(ctx, {
        classroomId: args.classroomId,
      }),
    ]);

    await Promise.all([
      deleteClassroomMemberships(ctx, {
        membershipIds: memberships.map((membership) => membership._id),
      }),
    ]);

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

    const membership = await getClassroomMembership(ctx, {
      classroomId: args.classroomId,
      userId: user._id,
    });

    if (!membership)
      throw new ConvexError("You are not a member of this classroom");

    await deleteClassroomMembership(ctx, {
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

    if (!classroom) throw new ConvexError("Classroom not found");

    const membership = await getClassroomMembership(ctx, {
      classroomId: args.classroomId,
      userId: user._id,
    });

    if (membership)
      throw new ConvexError("You are already a member of this classroom");

    await createClassroomMembership(ctx, {
      classroomId: args.classroomId,
      userId: user._id,
    });
  },
});

export const deleteClassroomMemberships = internalMutation({
  args: { membershipIds: v.array(v.id("classroomMemberships")) },
  async handler(ctx, args) {
    const memberships = args.membershipIds;

    const deletionPromises = memberships.map((membership) =>
      deleteClassroomMembership(ctx, { membershipId: membership })
    );

    await Promise.all(deletionPromises);
  },
});

export const updateClassroom = mutation({
  args: {
    classroomId: v.id("classrooms"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  async handler(ctx, args) {
    const classroom = await getClassroom(ctx, {
      classroomId: args.classroomId,
    });

    if (!classroom)
      throw new ConvexError("You are not authorized to update this classroom");

    const user = await assertSchoolOwner(ctx, {
      schoolId: classroom.schoolId,
    });

    if (!user)
      throw new ConvexError("You are not authorized to update this classroom");

    await ctx.db.patch(args.classroomId, {
      name: args.name ?? classroom.name,
      description: args.description ?? classroom.description,
    });
  },
});

export const getClassroomMemberships = query({
  args: { classroomId: v.id("classrooms") },
  async handler(ctx, args) {
    const memberships = await ctx.db
      .query("classroomMemberships")
      .withIndex("by_classroomId", (q) => q.eq("classroomId", args.classroomId))
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
