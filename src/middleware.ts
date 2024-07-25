import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define route matchers
// const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/forum(.*)"]);

const isPublicRoute = createRouteMatcher([
  "/",
  "/events/:id",
  "/api/webhook/clerk",
  "/api/webhook/stripe",
  "/api/uploadthing",
]);

const isIgnoredRoute = createRouteMatcher([
  "/api/webhook/clerk",
  "/api/webhook/stripe",
  "/api/uploadthing",
]);

export default clerkMiddleware((auth, req) => {
  if (isIgnoredRoute(req)) {
    return; // Do nothing for ignored routes
  }

  if (isPublicRoute(req)) {
    return; // Allow access for public routes
  }

  // if (isProtectedRoute(req)) {
  //   auth().protect(); // Protect routes
  // }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
