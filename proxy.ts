import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Pages only signed-in shoppers can see. Everything else stays public.
const isAccountPage = createRouteMatcher(["/account(.*)"]);

export default clerkMiddleware(
  async (auth, req) => {
    if (isAccountPage(req)) await auth.protect();
  },
  // Send logged-out visitors to our own login page, not Clerk's hosted one.
  { signInUrl: "/sign-in", signUpUrl: "/sign-up" },
);

export const config = {
  matcher: [
    // Skip Next.js internals and static files, unless found in search params.
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
