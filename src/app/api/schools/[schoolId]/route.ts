import { NextResponse } from "next/server";

import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";

interface Body {
  schoolId: string;
}

export async function GET(
  req: Request,
  { params }: { params: { schoolId: string } }
) {
  const schoolId = params.schoolId;

  if (!schoolId) {
    return NextResponse.json(
      { error: "School ID is required" },
      { status: 400 }
    );
  }

  try {
    const school = await fetchQuery(api.schools.getSchool, {
      schoolId: schoolId as Id<"schools">,
    });

    const schoolEvents = await fetchQuery(api.events.getEvents, {
      objectId: schoolId as Id<"schools">,
    });

    return NextResponse.json({ school, events: schoolEvents });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get school" },
      { status: 500 }
    );
  }
}
