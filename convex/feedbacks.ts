import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { assertAuthenticated } from "./users";

export const createFeedback = mutation({
  args: {
    title: v.string(),
    label: v.string(),
    message: v.string(),
  },
  async handler(ctx, args) {
    const user = await assertAuthenticated(ctx, {});

    await ctx.db.insert("feedbacks", {
      userId: user._id,
      title: args.title,
      label: args.label,
      message: args.message,
    });
  },
});
