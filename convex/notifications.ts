import { ConvexError, v } from "convex/values";
import { internalQuery, mutation, query } from "./_generated/server";
import { assertAuthenticated } from "./users";

export const getNotification = internalQuery({
  args: {
    notificationId: v.id("notifications"),
  },
  async handler(ctx, args) {
    const notification = await ctx.db
      .query("notifications")
      .withIndex("by_id", (q) => q.eq("_id", args.notificationId))
      .first();

    if (!notification) return;

    return notification;
  },
});

export const assertNotificationOwner = internalQuery({
  args: {
    notificationId: v.id("notifications"),
  },
  async handler(ctx, args) {
    const user = await assertAuthenticated(ctx, {});

    const notification = await getNotification(ctx, {
      notificationId: args.notificationId,
    });

    if (!notification) throw new ConvexError("Could not find notification");

    if (notification.userId !== user._id) throw new ConvexError("Unauthorized");

    return notification;
  },
});

export const getUserNotifications = query({
  args: {
    limit: v.optional(v.number()),
  },
  async handler(ctx, args) {
    const user = await assertAuthenticated(ctx, {});

    const notifications = ctx.db
      .query("notifications")
      .withIndex("by_userId", (q) => q.eq("userId", user._id));

    if (args.limit) return notifications.take(args.limit);

    return notifications.collect();
  },
});

export const getUnReadNotifications = query({
  args: {
    limit: v.optional(v.number()),
  },
  async handler(ctx, args) {
    const user = await assertAuthenticated(ctx, {});

    const notifications = ctx.db
      .query("notifications")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .filter((q) => q.eq(q.field("isRead"), false));

    if (args.limit) return notifications.take(args.limit);

    return notifications.collect();
  },
});

export const deleteNotification = mutation({
  args: {
    notificationId: v.id("notifications"),
  },
  async handler(ctx, args) {
    const notification = await assertNotificationOwner(ctx, {
      notificationId: args.notificationId,
    });

    await ctx.db.delete(notification._id);
  },
});

export const deleteNotifications = mutation({
  args: {
    notificationsIds: v.array(v.id("notifications")),
  },
  async handler(ctx, args) {
    await assertAuthenticated(ctx, {});

    const deletionPromises = args.notificationsIds.map(
      async (notificationId) => {
        await deleteNotification(ctx, { notificationId });
      }
    );

    await Promise.all(deletionPromises);
  },
});

export const updateNotification = mutation({
  args: {
    notificationId: v.id("notifications"),
    isRead: v.optional(v.boolean()),
  },
  async handler(ctx, args) {
    const notification = await assertNotificationOwner(ctx, {
      notificationId: args.notificationId,
    });

    await ctx.db.patch(notification._id, {
      isRead: args.isRead ?? notification.isRead,
    });
  },
});

export const updateNotifications = mutation({
  args: {
    notificationsIds: v.array(v.id("notifications")),
    isRead: v.optional(v.boolean()),
  },
  async handler(ctx, args) {
    await assertAuthenticated(ctx, {});

    const updatePromises = args.notificationsIds.map(async (notificationId) => {
      await updateNotification(ctx, {
        notificationId: notificationId,
        isRead: args.isRead,
      });
    });

    await Promise.all(updatePromises);
  },
});
