import { NextRequest, NextResponse } from "next/server";
import { fetchMutation } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface Body {
  objectId: string;
  key: string;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { objectId, key } = body as Body;

  if (!objectId || !key) {
    return NextResponse.json(
      { error: "Object ID and key are required" },
      {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }

  try {
    await fetchMutation(api.events.trackEvent, {
      objectId: objectId as Id<"schools"> | Id<"courses">,
      key: key,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to track event" },
      { status: 500 }
    );
  }
}
