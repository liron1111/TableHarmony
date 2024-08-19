import { ConvexError, v } from "convex/values";
import { internalQuery, mutation, query } from "./_generated/server";
import { getCurrentUser } from "./users";

export const createSchool = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    isPublic: v.boolean(),
  },
  async handler(ctx, args) {
    const user = await getCurrentUser(ctx, {});

    if (!user)
      throw new ConvexError("User must be logged in to view this content");

    await ctx.db.insert("schools", {
      name: args.name,
      description: args.description,
      isPublic: args.isPublic,
      creatorId: user._id,
    });
  },
});

export const getUserSchools = query({
  async handler(ctx) {
    const user = await getCurrentUser(ctx, {});

    if (!user) return null;

    return await ctx.db
      .query("schools")
      .withIndex("by_creatorId", (q) => q.eq("creatorId", user._id))
      .collect();
  },
});

export const getSchool = internalQuery({
  args: {
    schoolId: v.id("schools"),
  },
  async handler(ctx, args) {
    const school = await ctx.db
      .query("schools")
      .withIndex("by_id", (q) => q.eq("_id", args.schoolId))
      .first();

    if (!school) throw new ConvexError("Could not find school");

    return school;
  },
});

export const deleteSchool = mutation({
  args: {
    schoolId: v.id("schools"),
  },
  async handler(ctx, args) {
    const user = await getCurrentUser(ctx, {});

    if (!user) throw new ConvexError("Unauthorized");

    const school = await getSchool(ctx, args);

    if (school.creatorId !== user._id) throw new ConvexError("Unauthorized");

    await ctx.db.delete(school._id);
  },
});
