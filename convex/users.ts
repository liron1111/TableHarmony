import {
  internalMutation,
  internalQuery,
  mutation,
  query,
} from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { getClerkId } from "./util";

export const getCurrentUser = query({
  async handler(ctx) {
    const clerkId = await getClerkId(ctx);

    if (!clerkId) return null;

    const user = await getUserByClerkId(ctx, {
      clerkId: clerkId,
    });

    return user;
  },
});

export const getUserById = internalQuery({
  args: { userId: v.id("users") },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .withIndex("by_id", (q) => q.eq("_id", args.userId))
      .first();

    if (!user) throw new ConvexError("Could not find user");

    return user;
  },
});

export const getUserByClerkId = internalQuery({
  args: { clerkId: v.string() },
  async handler(ctx, args) {
    return await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .first();
  },
});

export const createUser = internalMutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    image: v.string(),
  },
  async handler(ctx, args) {
    const user = await getUserByClerkId(ctx, { clerkId: args.clerkId });

    if (user) throw new ConvexError("User already exists");

    await ctx.db.insert("users", {
      clerkId: args.clerkId,
      name: args.name,
      email: args.email,
      image: args.image,
    });
  },
});

export const deleteUser = internalMutation({
  args: { userId: v.id("users") },
  async handler(ctx, args) {
    const user = await getUserById(ctx, { userId: args.userId });

    if (!user) {
      throw new ConvexError("Could not find user");
    }

    if (user._id !== args.userId) throw new ConvexError("Unauthorized");

    await ctx.db.delete(user._id);
  },
});

export const updateUser = mutation({
  args: {
    userId: v.id("users"),
    image: v.optional(v.string()),
    name: v.optional(v.string()),
    bio: v.optional(v.string()),
  },
  async handler(ctx, args) {
    const user = await getUserById(ctx, { userId: args.userId });

    if (!user) {
      throw new ConvexError("Could not find user");
    }

    await ctx.db.patch(user._id, {
      image: args.image || user.image,
      name: args.name || user.name,
      bio: args.bio || user.bio,
    });
  },
});
