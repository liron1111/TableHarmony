import { ConvexError, v } from "convex/values";
import {
  internalMutation,
  internalQuery,
  mutation,
  query,
} from "./_generated/server";

import { schoolRoleType } from "./schema";

import { assertSchoolManager } from "./schools";
import { getCurrentUser } from "./users";

export const assertSchoolMembershipAccess = internalQuery({
  args: { membershipId: v.id("schoolMemberships") },
  async handler(ctx, args) {
    const membership = await ctx.db.get(args.membershipId);

    if (!membership) return null;

    const user = await getCurrentUser(ctx, {});

    if (!user) return null;

    if (membership.userId === user._id) return membership;

    const school = await assertSchoolManager(ctx, {
      schoolId: membership.schoolId,
    });

    console.log(school);

    if (!school) return null;

    return membership;
  },
});

export const createSchoolMembership = internalMutation({
  args: {
    schoolId: v.id("schools"),
    userId: v.id("users"),
    role: schoolRoleType,
  },
  async handler(ctx, args) {
    const school = await assertSchoolManager(ctx, { schoolId: args.schoolId });

    if (!school)
      throw new ConvexError(
        "Unauthorized to create memberships for this school"
      );

    const membership = await getSchoolMembership(ctx, {
      schoolId: school._id,
      userId: args.userId,
    });

    if (membership) throw new ConvexError("User already a member ");

    await ctx.db.insert("schoolMemberships", {
      userId: args.userId,
      schoolId: args.schoolId,
      role: args.role,
      boardingComplete: args.role === "manager",
    });
  },
});

export const getUserSchoolMemberships = internalQuery({
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

export const getSchoolMembership = query({
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

export const deleteSchoolMembership = internalMutation({
  args: { membershipId: v.id("schoolMemberships") },
  async handler(ctx, args) {
    const membership = await assertSchoolMembershipAccess(ctx, {
      membershipId: args.membershipId,
    });

    if (!membership)
      throw new ConvexError("Unauthorized to delete this membership");

    if (membership.role === "teacher") {
      //TODO: delete all courses e.t.c
    }

    if (membership.role === "student") {
      //TODO: delete all course memberships/enrollments e.t.c
    }

    await ctx.db.delete(membership._id);
  },
});

export const deleteSchoolMemberships = mutation({
  args: { membershipIds: v.array(v.id("schoolMemberships")) },
  async handler(ctx, args) {
    const promises = args.membershipIds.map((membershipId) =>
      deleteSchoolMembership(ctx, { membershipId })
    );

    await Promise.all(promises);
  },
});

export const completeOnboarding = mutation({
  args: { membershipId: v.id("schoolMemberships") },
  async handler(ctx, args) {
    const membership = await assertSchoolMembershipAccess(ctx, {
      membershipId: args.membershipId,
    });

    if (!membership)
      throw new ConvexError("Unauthorized to complete onboarding");

    await ctx.db.patch(membership._id, {
      boardingComplete: true,
    });
  },
});
