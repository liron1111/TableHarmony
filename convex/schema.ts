import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const schoolRoleType = v.union(
  v.literal("manager"),
  v.literal("teacher"),
  v.literal("student")
);

export const schoolEnrollmentRoleType = v.union(
  v.literal("teacher"),
  v.literal("student"),
  v.literal("manager")
);

export const courseRoleType = v.union(
  v.literal("manager"),
  v.literal("student")
);

export const dayType = v.union(
  v.literal("monday"),
  v.literal("tuesday"),
  v.literal("wednesday"),
  v.literal("thursday"),
  v.literal("friday"),
  v.literal("saturday"),
  v.literal("sunday")
);

export const eventType = v.union(v.literal("exam"), v.literal("assignment"));

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    bio: v.optional(v.string()),
  })
    .index("by_clerkId", ["clerkId"])
    .index("by_email", ["email"]),
  notifications: defineTable({
    userId: v.id("users"),
    title: v.string(),
    isRead: v.boolean(),
  }).index("by_userId", ["userId"]),
  feedbacks: defineTable({
    userId: v.id("users"),
    title: v.string(),
    label: v.string(),
    message: v.string(),
  }),
  schools: defineTable({
    name: v.string(),
    description: v.string(),
    isPublic: v.boolean(),
    image: v.string(),
    info: v.optional(v.string()),
  }),
  semesters: defineTable({
    schoolId: v.id("schools"),
    name: v.string(),
    from: v.number(),
    to: v.number(),
  }).index("by_schoolId", ["schoolId"]),
  schoolMemberships: defineTable({
    schoolId: v.id("schools"),
    userId: v.id("users"),
    role: schoolRoleType,
    boardingComplete: v.boolean(),
  })
    .index("by_schoolId_userId", ["schoolId", "userId"])
    .index("by_schoolId", ["schoolId"])
    .index("by_userId", ["userId"]),
  schoolEnrollments: defineTable({
    schoolId: v.id("schools"),
    userId: v.id("users"),
    role: schoolEnrollmentRoleType,
  })
    .index("by_schoolId_userId", ["schoolId", "userId"])
    .index("by_schoolId", ["schoolId"])
    .index("by_userId", ["userId"]),
  courses: defineTable({
    schoolId: v.id("schools"),
    name: v.string(),
    description: v.string(),
    image: v.string(),
    info: v.optional(v.string()),
  }).index("by_schoolId", ["schoolId"]),
  courseMemberships: defineTable({
    courseId: v.id("courses"),
    userId: v.id("users"),
    role: courseRoleType,
  })
    .index("by_courseId_userId", ["courseId", "userId"])
    .index("by_courseId", ["courseId"])
    .index("by_userId", ["userId"]),
  courseEnrollments: defineTable({
    courseId: v.id("courses"),
    userId: v.id("users"),
  })
    .index("by_courseId_userId", ["courseId", "userId"])
    .index("by_courseId", ["courseId"])
    .index("by_userId", ["userId"]),
  courseEvents: defineTable({
    courseId: v.id("courses"),
    title: v.string(),
    description: v.string(),
    type: eventType,
    date: v.number(),
  }).index("by_courseId", ["courseId"]),
  classes: defineTable({
    courseId: v.id("courses"),
    day: dayType,
    from: v.number(),
    to: v.number(),
  }).index("by_courseId", ["courseId"]),
});
