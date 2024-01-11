"use client";

import { useSignIn, useSignUp, useUser } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingSpinner from "../../components/general/loadingSpinner";

const SSOCallBack = () => {
    const user = useUser()
    if (user.isLoaded && user.isSignedIn) {
        redirect("/dashboard/user");
    }
    const { isLoaded: signInLoaded, signIn, setActive } = useSignIn();
    const { isLoaded: signUpLoaded, signUp } = useSignUp();
    const router = useRouter();

    useEffect(() => {
        console.log(1)
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
            console.log(2)
            const userNeedsToBeCreated = signIn.firstFactorVerification.status === "transferable";
            console.log(3)
            if (userNeedsToBeCreated) {
                console.log(4)
                const res = await signUp.create({ transfer: true });
                console.log(5)
                if (res.status === "complete") {
                    console.log(6)
                    await setActive({ session: res.createdSessionId });
                }
                console.log(7)
            }
            console.log(8)
            router.push("/dashboard");
            console.log(9)
        };
        try {
            handleSSOLogin();
            console.log(10)
        } catch (err) {
            console.log(11)
            throw err
        }
    }, [signInLoaded, signUpLoaded]);

    return (
        <div className="h-screen flex items-center justify-center">
            <LoadingSpinner/>
        </div>
    );
};

export default SSOCallBack;
