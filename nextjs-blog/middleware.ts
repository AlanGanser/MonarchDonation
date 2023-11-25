import { authMiddleware } from "@clerk/nextjs";

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
    ],
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};