import { clerkMiddleware, createRouteMatcher, clerkClient } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/", "/login(.*)", "/register(.*)", "/api/webhooks/clerk(.*)", "/cart"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
    if (isAdminRoute(req)) {
        const { userId, sessionClaims } = await auth();

        if (!userId) {
            const url = new URL("/login", req.url);
            return Response.redirect(url);
        }

        // Try to get role from claims (faster)
        let role = sessionClaims?.metadata?.role;

        // Fallback: If role is not in claims, fetch the user object directly
        // This handles cases where the user hasn't configured the JWT template in Clerk Dashboard
        if (!role) {
            const client = await clerkClient();
            const user = await client.users.getUser(userId);
            role = user.publicMetadata.role as "admin" | "client";
        }

        if (role !== "admin") {
            const url = new URL("/", req.url);
            return Response.redirect(url);
        }
    }

    if (!isPublicRoute(req)) {
        await auth.protect();
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
