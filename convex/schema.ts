import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const schoolRoleType = v.union(
  v.literal("manager"),
  v.literal("teacher"),
  v.literal("student")
);

export const schoolEnrollmentRoleType = v.union(
  v.literal("teacher"),
  v.literal("student")
);

export const courseRoleType = v.union(
  v.literal("manager"),
  v.literal("student")
);

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
    creatorId: v.id("users"),
    name: v.string(),
    description: v.string(),
    isPublic: v.boolean(),
    image: v.string(),
    info: v.optional(v.string()),
  }).index("by_creatorId", ["creatorId"]),
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
    creatorId: v.id("users"),
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
});
