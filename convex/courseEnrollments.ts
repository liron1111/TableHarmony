import { ConvexError, v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";
import { assertCourseOwner, getCourse } from "./courses";
import { getSchool } from "./schools";
import { getMembership } from "./schoolMemberships";
import { getCourseMembership } from "./courseMemberships";
import { assertAuthenticated } from "./users";

export const getEnrollment = query({
  args: {
    courseId: v.id("courses"),
    userId: v.id("users"),
  },
  async handler(ctx, args) {
    const enrollment = await ctx.db
      .query("courseEnrollments")
      .withIndex("by_courseId_userId", (q) =>
        q.eq("courseId", args.courseId).eq("userId", args.userId)
      )
      .first();

    return enrollment;
  },
});

export const createCourseEnrollment = mutation({
  args: {
    courseId: v.id("courses"),
    userId: v.id("users"),
  },
  async handler(ctx, args) {
    const course = await getCourse(ctx, { courseId: args.courseId });

    if (!course) {
      throw new ConvexError("Course not found");
    }

    const school = await getSchool(ctx, { schoolId: course.schoolId });

    if (!school) {
      throw new ConvexError("School not found");
    }

    const schoolMembership = await getMembership(ctx, {
      schoolId: school._id,
      userId: args.userId,
    });

    if (!schoolMembership || schoolMembership.role !== "student") {
      throw new ConvexError("Unauthorized to enroll in course");
    }

    const courseMembership = await getCourseMembership(ctx, {
      courseId: course._id,
      userId: args.userId,
    });

    if (courseMembership) {
      throw new ConvexError("Already a member in course");
    }

    const enrollment = await getEnrollment(ctx, {
      courseId: course._id,
      userId: args.userId,
    });

    if (enrollment) {
      throw new ConvexError("Already enrolled in course");
    }

    await ctx.db.insert("courseEnrollments", {
      courseId: args.courseId,
      userId: args.userId,
    });
  },
});

export const deleteCourseEnrollment = internalMutation({
  args: {
    enrollmentId: v.id("courseEnrollments"),
  },
  async handler(ctx, args) {
    const enrollment = await ctx.db.get(args.enrollmentId);

    if (!enrollment) {
      throw new ConvexError("Enrollment not found");
    }

    const course = await assertCourseOwner(ctx, {
      courseId: enrollment.courseId,
    });

    if (!course) {
      throw new ConvexError("Unauthorized to delete enrollment");
    }

    await ctx.db.delete(args.enrollmentId);
  },
});
