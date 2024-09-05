import { ConvexError, v } from "convex/values";
import { internalMutation, internalQuery, query } from "./_generated/server";
import { getCurrentUser } from "./users";
import { getMembership } from "./schoolMemberships";

export const assertClassroomMembershipAccess = internalQuery({
  args: { membershipId: v.id("classroomMemberships") },
  async handler(ctx, args) {
    const membership = await ctx.db.get(args.membershipId);

    if (!membership) return null;

    const user = await getCurrentUser(ctx, {});

    if (!user) return null;

    if (membership.userId === user._id) return membership;

    return null;
  },
});

export const getClassroomMembership = query({
  args: { classroomId: v.id("classrooms"), userId: v.id("users") },
  async handler(ctx, args) {
    const membership = await ctx.db
      .query("classroomMemberships")
      .withIndex("by_classroomId_userId", (q) =>
        q.eq("classroomId", args.classroomId).eq("userId", args.userId)
      )
      .first();

    return membership;
  },
});

export const createClassroomMembership = internalMutation({
  args: { classroomId: v.id("classrooms"), userId: v.id("users") },
  async handler(ctx, args) {
    const classroom = await ctx.db.get(args.classroomId);

    if (!classroom) throw new ConvexError("Classroom not found");

    const membership = await getMembership(ctx, {
      schoolId: classroom.schoolId,
      userId: args.userId,
    });

    if (!membership) throw new ConvexError("Membership not found");

    if (membership.role === "manager") {
      throw new ConvexError(
        "Managers are not allowed to be added to classrooms"
      );
    }

    await ctx.db.insert("classroomMemberships", {
      classroomId: args.classroomId,
      userId: args.userId,
      role: membership.role,
    });
  },
});

export const deleteClassroomMembership = internalMutation({
  args: { membershipId: v.id("classroomMemberships") },
  async handler(ctx, args) {
    const membership = await assertClassroomMembershipAccess(ctx, {
      membershipId: args.membershipId,
    });

    if (!membership)
      throw new ConvexError("You are not authorized to delete this membership");

    await ctx.db.delete(membership._id);
  },
});
