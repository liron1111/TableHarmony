import { ConvexError, v } from "convex/values";
import { internalMutation, internalQuery, query } from "./_generated/server";

import { assertAuthenticated } from "./users";
import { schoolRoleType } from "./schema";
import { assertSchoolOwner } from "./schools";

export const createMembership = internalMutation({
  args: {
    schoolId: v.id("schools"),
    userId: v.id("users"),
    role: schoolRoleType,
  },
  async handler(ctx, args) {
    await assertSchoolOwner(ctx, { schoolId: args.schoolId });

    const membership = await ctx.db
      .query("schoolMembers")
      .withIndex("by_schoolId_userId", (q) =>
        q.eq("schoolId", args.schoolId).eq("userId", args.userId)
      )
      .first();

    if (membership) throw new ConvexError("User already has a membership");

    await ctx.db.insert("schoolMembers", {
      userId: args.userId,
      schoolId: args.schoolId,
      role: args.role,
    });
  },
});

export const getUserMemberships = internalQuery({
  async handler(ctx) {
    const user = await assertAuthenticated(ctx, {});

    const memberships = await ctx.db
      .query("schoolMembers")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();

    return memberships;
  },
});

export const getSchoolMemberships = query({
  args: { schoolId: v.id("schools") },
  async handler(ctx, args) {
    const memberships = await ctx.db
      .query("schoolMembers")
      .withIndex("by_schoolId", (q) => q.eq("schoolId", args.schoolId))
      .collect();

    return memberships;
  },
});
