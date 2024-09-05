import { ConvexError, v } from "convex/values";
import { internalMutation, internalQuery, query } from "./_generated/server";
import { getCurrentUser } from "./users";

export const assertMembershipAccess = internalQuery({
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

export const getMembership = query({
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

export const createMembership = internalMutation({
  args: { classroomId: v.id("classrooms"), userId: v.id("users") },
  async handler(ctx, args) {
    await ctx.db.insert("classroomMemberships", {
      classroomId: args.classroomId,
      userId: args.userId,
      role: "student",
    });
  },
});

export const deleteMembership = internalMutation({
  args: { membershipId: v.id("classroomMemberships") },
  async handler(ctx, args) {
    const membership = await assertMembershipAccess(ctx, {
      membershipId: args.membershipId,
    });

    if (!membership)
      throw new ConvexError("You are not authorized to delete this membership");

    await ctx.db.delete(membership._id);
  },
});
