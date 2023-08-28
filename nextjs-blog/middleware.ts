import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
    // "/" will be accessible to all users
    publicRoutes: ["/", "/about", "/contact", "/schedule-donation", "/sign-in", "/sign-up"], // TODO add sign-in and sign-up to env
    ignoredRoutes: ["/api(.*)"] // TODO
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"], // TODO allow api route to be accessed when not logged in (Change this update later in production)
};