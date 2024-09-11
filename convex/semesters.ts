import { ConvexError, v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";
import {
  assertSchoolManager,
  getCurrentSemester,
  getSchoolSemesters,
} from "./schools";
import { startOfDay, startOfToday } from "date-fns";

export const createSemester = mutation({
  args: {
    schoolId: v.id("schools"),
    name: v.string(),
    from: v.number(),
    to: v.number(),
  },
  async handler(ctx, args) {
    const from = startOfDay(args.from).getTime();
    const to = startOfDay(args.to).getTime();

    const school = await assertSchoolManager(ctx, { schoolId: args.schoolId });

    if (!school) throw new ConvexError("Unauthorized: Cannot create semester");

    if (from < startOfToday().getTime() || to <= from)
      throw new ConvexError("Invalid date range");

    const existingSemesters = await getSchoolSemesters(ctx, {
      schoolId: school._id,
    });

    const overlappingSemesters = existingSemesters.filter(
      (semester) => from < semester.to && to > semester.from
    );

    if (overlappingSemesters.length > 0)
      throw new ConvexError("Semester dates overlap with existing semesters");

    await ctx.db.insert("semesters", {
      schoolId: school._id,
      name: args.name,
      from,
      to,
    });
  },
});

export const updateSemester = mutation({
  args: {
    semesterId: v.id("semesters"),
    name: v.string(),
    from: v.number(),
    to: v.number(),
  },
  async handler(ctx, args) {
    const from = startOfDay(args.from).getTime();
    const to = startOfDay(args.to).getTime();

    if (from < startOfToday().getTime() || to <= from)
      throw new ConvexError("Invalid date range");

    const semester = await ctx.db.get(args.semesterId);

    if (!semester) throw new ConvexError("Semester not found");

    const school = await assertSchoolManager(ctx, {
      schoolId: semester.schoolId,
    });

    if (!school) throw new ConvexError("Unauthorized: Cannot update semester");

    const existingSemesters = await getSchoolSemesters(ctx, {
      schoolId: school._id,
    });

    const overlappingSemesters = existingSemesters.filter(
      (semester) =>
        from < semester.to &&
        to > semester.from &&
        args.semesterId !== semester._id
    );

    if (overlappingSemesters.length > 0)
      throw new ConvexError("Semester dates overlap with existing semesters");

    await ctx.db.patch(args.semesterId, {
      name: args.name,
      from,
      to,
    });
  },
});

export const deleteSemester = mutation({
  args: {
    semesterId: v.id("semesters"),
  },
  async handler(ctx, args) {
    const semester = await ctx.db.get(args.semesterId);

    if (!semester) throw new ConvexError("Semester not found");

    const school = await assertSchoolManager(ctx, {
      schoolId: semester.schoolId,
    });

    if (!school) throw new ConvexError("Unauthorized: Cannot delete semester");

    await ctx.db.delete(args.semesterId);
  },
});

export const getSemester = query({
  args: {
    semesterId: v.id("semesters"),
  },
  async handler(ctx, args) {
    const semester = await ctx.db.get(args.semesterId);
    return semester;
  },
});

export const endSemester = mutation({
  args: {
    schoolId: v.id("schools"),
  },
  async handler(ctx, args) {
    const semester = await getCurrentSemester(ctx, { schoolId: args.schoolId });

    if (!semester) throw new ConvexError("Semester not found");

    if (semester.to > startOfToday().getTime())
      throw new ConvexError("Semester has not ended");

    //TODO: delete events enrollments and memberships
    await ctx.db.delete(semester._id);
  },
});
