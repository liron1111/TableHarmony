import { NextRequest, NextResponse } from "next/server";
import { fetchMutation } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface Body {
  objectId: string;
  key: string;
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
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
    return NextResponse.json(
      { success: true },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to track event" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
