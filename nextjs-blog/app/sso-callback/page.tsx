"use client";

import { useSignIn, useSignUp, useUser } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingSpinner from "../../componenets/general/loadingSpinner";

const SSOCallBack = () => {
    const user = useUser()
    if (user.isLoaded && user.isSignedIn) {
        redirect("/dashboard/user");
    }
    const { isLoaded: signInLoaded, signIn, setActive } = useSignIn();
    const { isLoaded: signUpLoaded, signUp } = useSignUp();
    const router = useRouter();

    useEffect(() => {
        if (!signInLoaded || !signUpLoaded) return; // true
        const handleSSOLogin = async () => {
            //sign-in
            const userExistsButNeedsToSignIn =
                signUp.verifications.externalAccount.status === "transferable" &&
                signUp.verifications.externalAccount.error?.code === "external_account_exists";

            if (userExistsButNeedsToSignIn) {
                const res = await signIn.create({ transfer: true });
                if (res.status === "complete") {
                    setActive({ session: res.createdSessionId });
                }
            }
            //sign-up
            const userNeedsToBeCreated = signIn.firstFactorVerification.status === "transferable";
            if (userNeedsToBeCreated) {
                const res = await signUp.create({ transfer: true });
                if (res.status === "complete") {
                    await setActive({ session: res.createdSessionId });
                }
            }
            router.push("/dashboard");
        };
        handleSSOLogin();
    }, [signInLoaded, signUpLoaded]);

    return (
        <div className="h-screen flex items-center justify-center">
            <LoadingSpinner/>
        </div>
    );
};

export default SSOCallBack;
