import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const trackEvent = mutation({
  args: {
    objectId: v.union(v.id("schools"), v.id("courses")),
    key: v.string(),
  },
  async handler(ctx, args) {
    await ctx.db.insert("events", {
      objectId: args.objectId,
      key: args.key,
    });
  },
});

export const getEvents = query({
  args: {
    objectId: v.union(v.id("schools"), v.id("courses")),
  },
  async handler(ctx, args) {
    const events = await ctx.db
      .query("events")
      .withIndex("by_objectId", (q) => q.eq("objectId", args.objectId))
      .collect();

    return events;
  },
});
