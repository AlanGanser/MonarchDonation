import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
    // publicRoutes will be accessible to all users
    publicRoutes: [
        "/",
        "/about",
        "/contact",
        "/schedule-donation",
        "/sign-in",
        "/sign-up",
        "/sso-callback",
        "/reset-password",
        "/api/webhooks(.*)",
        "/api/users(.*)"
    ],
    // debug: true,
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
