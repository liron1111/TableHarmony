import { ConvexError, v } from "convex/values";
import {
  internalMutation,
  internalQuery,
  mutation,
  query,
} from "./_generated/server";

import { schoolRoleType } from "./schema";
import { assertSchoolOwner, getSchool } from "./schools";
import { getCurrentUser } from "./users";
import { AuthorizationError } from "@/utils/errors";

export const assertMembershipAccess = internalQuery({
  args: { membershipId: v.id("schoolMemberships") },
  async handler(ctx, args) {
    const membership = await ctx.db.get(args.membershipId);

    if (!membership) return null;

    const user = await getCurrentUser(ctx, {});

    if (!user) return null;

    if (membership.userId === user._id) return membership;

    const school = await getSchool(ctx, { schoolId: membership.schoolId });
    if (school?.creatorId === user._id) return membership;

    return null;
  },
});

export const createMembership = internalMutation({
  args: {
    schoolId: v.id("schools"),
    userId: v.id("users"),
    role: schoolRoleType,
  },
  async handler(ctx, args) {
    const school = await assertSchoolOwner(ctx, { schoolId: args.schoolId });

    if (!school) throw new AuthorizationError();

    const membership = await getMembership(ctx, {
      schoolId: school._id,
      userId: args.userId,
    });

    if (membership) throw new ConvexError("User already has a membership");

    await ctx.db.insert("schoolMemberships", {
      userId: args.userId,
      schoolId: args.schoolId,
      role: args.role,
      boardingComplete: args.role === "manager",
    });
  },
});

export const getUserMemberships = internalQuery({
  async handler(ctx) {
    const user = await getCurrentUser(ctx, {});

    if (!user) return [];

    const memberships = await ctx.db
      .query("schoolMemberships")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();

    return memberships;
  },
});

export const getMembership = query({
  args: { schoolId: v.id("schools"), userId: v.id("users") },
  async handler(ctx, args) {
    const membership = await ctx.db
      .query("schoolMemberships")
      .withIndex("by_schoolId_userId", (q) =>
        q.eq("schoolId", args.schoolId).eq("userId", args.userId)
      )
      .first();

    return membership;
  },
});

export const deleteMembership = internalMutation({
  args: { membershipId: v.id("schoolMemberships") },
  async handler(ctx, args) {
    const membership = await assertMembershipAccess(ctx, {
      membershipId: args.membershipId,
    });

    if (!membership) throw new AuthorizationError();

    await ctx.db.delete(membership._id);
  },
});

export const deleteMemberships = mutation({
  args: { membershipIds: v.array(v.id("schoolMemberships")) },
  async handler(ctx, args) {
    const memberships = args.membershipIds;

    const deletionPromises = memberships.map((membership) =>
      deleteMembership(ctx, { membershipId: membership })
    );

    await Promise.all(deletionPromises);
  },
});

export const completeOnboarding = mutation({
  args: { membershipId: v.id("schoolMemberships") },
  async handler(ctx, args) {
    const membership = await assertMembershipAccess(ctx, {
      membershipId: args.membershipId,
    });

    if (!membership) throw new AuthorizationError();

    await ctx.db.patch(membership._id, {
      boardingComplete: true,
    });
  },
});
