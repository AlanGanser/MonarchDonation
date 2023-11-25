"use client";

import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../form/input";
import { passwordValidation, emailValidation } from "../form/inputValidation";
import { BsExclamationLg } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";
import { OAuthStrategy, User } from "@clerk/nextjs/dist/types/server";
import Link from "next/link";
import { useRouter } from "next/navigation";

const errorMessages = {
    form_password_incorrect: "Your password is incorrect",
    form_identifier_not_found: "Your email address is incorrect",
};

const UserSignIn = () => {
    const { isLoaded, signIn, setActive } = useSignIn();
    const [errMessage, setErrMessage] = useState("");
    const methods = useForm();
    const router = useRouter();

    const signInWith = (strategy: OAuthStrategy) => {
        return signIn?.authenticateWithRedirect({
            strategy,
            redirectUrl: "/sso-callback",
            redirectUrlComplete: "/dashboard",
        });
    };

    const onSubmit = methods.handleSubmit(async ({ email, password }) => {
        if (!isLoaded) {
            return;
        }

        try {
            const result = await signIn.create({
                identifier: email,
                password,
            });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                router.push("/dashboard");
            }
        } catch (err: any) {
            if (errorMessages.hasOwnProperty(err.errors[0].code)) {
                setErrMessage(errorMessages[err.errors[0].code as keyof typeof errorMessages]);
            } else {
                setErrMessage(err.errors[0].message);
            }
        }
    });

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center pt-5 pb-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Monarch Donations</span>
                        <Image
                            height={40}
                            width={40}
                            className="mx-auto h-10 w-auto"
                            src="/images/monarch-logo.png"
                            alt="Monarch Donations logo"
                        />
                    </Link>
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-8 shadow sm:rounded-lg sm:px-12">
                        {errMessage && (
                            <div className="flex justify-center items-center gap-1 py-1 px-2 font-semibold font-base text-red-600 bg-red-100 rounded-md text-sm mb-4">
                                <BsExclamationLg size={25} className="mr-3 flex-shrink-0" />
                                <p className="text-center">{errMessage}</p>
                            </div>
                        )}
                        <FormProvider {...methods}>
                            <form onSubmit={(e) => e.preventDefault()} noValidate className="space-y-6">
                                <Input {...emailValidation} />

                                <Input {...passwordValidation} />

                                <div className="text-sm leading-6">
                                    <Link
                                        href="/reset-password"
                                        className="font-semibold text-orange-500 underline hover:text-orange-400"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>

                                <button
                                    onClick={onSubmit}
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                                >
                                    Sign in
                                </button>
                            </form>
                        </FormProvider>

                        <div>
                            <div className="relative mt-10">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center text-sm font-medium leading-6">
                                    <span className="bg-white px-6 text-gray-900">Or</span>
                                </div>
                            </div>
                            <div className="mt-6 space-y-3">
                                <button
                                    className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white shadow-sm px-3 py-1.5 text-gray-700 transition hover:-translate-y-1 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:transform-none"
                                    onClick={() => signInWith("oauth_google")}
                                >
                                    <FcGoogle size={20} />
                                    <span className="text-sm font-semibold leading-6">Continue with Google</span>
                                </button>
                                <button
                                    className="flex w-full items-center justify-center gap-3 rounded-md border bg-black shadow-sm px-3 py-1.5 text-white transition hover:-translate-y-1 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:transform-none"
                                    onClick={() => signInWith("oauth_apple")}
                                >
                                    <FaApple size={20} />
                                    <span className="text-sm font-semibold leading-6">Continue with Apple</span>
                                </button>
                            </div>
                            <p className="mt-9 text-center text-sm text-gray-400">
                                Don't have an account?{" "}
                                <Link
                                    href="/sign-up"
                                    className="font-semibold leading-6 text-orange-500 underline hover:text-orange-400"
                                >
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserSignIn;
