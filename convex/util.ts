import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import {
  ActionCtx,
  mutation,
  MutationCtx,
  query,
  QueryCtx,
} from "./_generated/server";

export function formatName(
  firstName?: string | null,
  lastName?: string | null
) {
  firstName = firstName ?? "";
  lastName = lastName ?? "";
  let combinedName = `${firstName} ${lastName}`.trim();
  if (combinedName === "") {
    combinedName = "Anonymous";
  }
  return combinedName;
}

export async function getClerkId(ctx: QueryCtx | ActionCtx | MutationCtx) {
  return (await ctx.auth.getUserIdentity())?.subject;
}

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const getImageUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});
