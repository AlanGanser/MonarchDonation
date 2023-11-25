import { useSignIn, useSignUp } from "@clerk/nextjs";
import { OAuthStrategy, SignInResource } from "@clerk/types";


export const GoogleButton = () => {
    const { isLoaded, signIn } = useSignIn(); // session deprecated for Clerk.setActive
    const { signUp } = useSignUp();

    const handleGoogleLogin = async () => {
        try {
            await signIn?.create({
                strategy: "oauth_google",
                redirectUrl: "/sso-callback",
                actionCompleteRedirectUrl: "/dashboard",
            });

            const {firstFactorVerification: {externalVerificationRedirectURL}} = signIn as SignInResource;

            if (!externalVerificationRedirectURL) {
                throw "Something went wrong with OAuth"
            }

            
        } catch {}
    };
};
