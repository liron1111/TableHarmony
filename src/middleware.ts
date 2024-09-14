import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/schools(.*)",
  "/account-settings",
  "/notifications",
  "/browse",
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();

  // Add CORS headers for API routes
  if (req.nextUrl.pathname.startsWith("/api")) {
    const response = NextResponse.next();
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    return response;
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
