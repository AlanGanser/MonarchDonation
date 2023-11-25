"use client";

import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../form/input";
import {
    firstNameValidation,
    lastNameValidation,
    emailValidation,
    codeValidation,
    newPasswordValidation,
} from "../form/inputValidation";
import { HiXMark } from "react-icons/hi2";
import { BsExclamationLg } from "react-icons/bs";
import { Dialog, Transition } from "@headlessui/react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useSignUp } from "@clerk/nextjs";
import { useState, Fragment, useRef } from "react";
import { OAuthStrategy, User } from "@clerk/nextjs/dist/types/server";
import { useRouter } from "next/navigation";
import Link from "next/link";

const errorMessages = {
    form_password_pwned: "Please use a stronger password",
};
const verificationErrorMessages = {
    form_code_incorrect: "Incorrect code, please re-enter the code",
    verification_failed: "Too many attempts, please restart the sign-up process",
};

const UserSignUp = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [showVerificationDialog, setShowVerificationDialog] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const [verificationErr, setVerificationErr] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [codeResent, setCodeResent] = useState(false);
    const codeInputRef = useRef(null);

    const signUpMethods = useForm();
    const verifyMethods = useForm();
    const router = useRouter();

    const signUpWith = (strategy: OAuthStrategy) => {
        return signUp?.authenticateWithRedirect({
            strategy,
            redirectUrl: "/sso-callback",
            redirectUrlComplete: "/dashboard",
        });
    };

    const onSubmit = signUpMethods.handleSubmit(async ({ email, newPassword, firstName, lastName }) => {
        if (!isLoaded) return;

        try {
            await signUp.create({
                firstName,
                lastName,
                emailAddress: email,
                password: newPassword,
            });
            // send the email.
            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

            setErrMessage("");
            setUserEmail(email);
            setShowVerificationDialog(true);
        } catch (err: any) {
            if (errorMessages.hasOwnProperty(err.errors[0].code)) {
                setErrMessage(errorMessages[err.errors[0].code as keyof typeof errorMessages]);
            } else {
                setErrMessage(err.errors[0].message);
            }
        }
    });

    const onVerify = verifyMethods.handleSubmit(async ({ otp }) => {
        if (!isLoaded) {
            return;
        }

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code: otp,
            });
            if (completeSignUp.status === "complete") {
                await setActive({ session: completeSignUp.createdSessionId });
                router.push("/dashboard");
            }
        } catch (err: any) {
            if (verificationErrorMessages.hasOwnProperty(err.errors[0].code)) {
                setVerificationErr(
                    verificationErrorMessages[err.errors[0].code as keyof typeof verificationErrorMessages]
                );
            } else {
                setVerificationErr(err.errors[0].message);
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
                        Create your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-8 shadow sm:rounded-lg sm:px-12">
                        {errMessage && (
                            <div className="flex justify-center items-center gap-1 py-1 px-2 font-semibold font-base text-red-600 bg-red-100 rounded-md text-sm mb-4">
                                <BsExclamationLg size={25} className="mr-3 flex-shrink-0" />
                                {errMessage && <p className="text-center">{errMessage}</p>}
                            </div>
                        )}
                        <FormProvider {...signUpMethods}>
                            <form onSubmit={(e) => e.preventDefault()} noValidate className="space-y-6">
                                <div className="grid gap-x-6 sm:grid-cols-6 gap-y-6">
                                    <div className="col-span-3">
                                        <Input {...firstNameValidation} />
                                    </div>
                                    <div className="col-span-3">
                                        <Input {...lastNameValidation} />
                                    </div>
                                </div>
                                <Input {...emailValidation} />
                                <Input {...newPasswordValidation} />

                                <button
                                    onClick={onSubmit}
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                                >
                                    Sign up
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
                                    onClick={() => signUpWith("oauth_google")}
                                >
                                    <FcGoogle size={20} />
                                    <span className="text-sm font-semibold leading-6">Continue with Google</span>
                                </button>
                                <button
                                    className="flex w-full items-center justify-center gap-3 rounded-md border bg-black shadow-sm px-3 py-1.5 text-white transition hover:-translate-y-1 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:transform-none"
                                    onClick={() => signUpWith("oauth_apple")}
                                >
                                    <FaApple size={20} />
                                    <span className="text-sm font-semibold leading-6">Continue with Apple</span>
                                </button>
                            </div>
                            <p className="mt-9 text-center text-sm text-gray-400">
                                Already have an account?{" "}
                                <Link
                                    href="/sign-in"
                                    className="font-semibold leading-6 text-orange-500 underline hover:text-orange-400"
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Transition.Root show={showVerificationDialog} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    initialFocus={codeInputRef}
                    onClose={() => {
                        setShowVerificationDialog(false);
                        setVerificationErr("");
                        verifyMethods.reset();
                    }}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                    <div className="absolute right-0 top-0 pr-4 pt-4 block">
                                        <button
                                            type="button"
                                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                                            onClick={() => {
                                                setShowVerificationDialog(false);
                                                setVerificationErr("");
                                                verifyMethods.reset();
                                            }}
                                        >
                                            <span className="sr-only">Close</span>
                                            <HiXMark className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    <div className="text-center">
                                        <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                                            Email verification
                                        </Dialog.Title>
                                        <Dialog.Description>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Enter the code you received at{" "}
                                                    <span className="text-gray-900 font-semibold">{userEmail}</span>
                                                </p>
                                            </div>
                                        </Dialog.Description>
                                    </div>

                                    {verificationErr && (
                                        <div className="flex justify-center items-center gap-1 py-1 px-2 mt-5 font-semibold font-base text-red-600 bg-red-100 rounded-md text-sm">
                                            <BsExclamationLg size={25} className="h-5 w-5 mr-3 flex-shrink-0" />
                                            <p className="text-center">{verificationErr}</p>
                                        </div>
                                    )}
                                    <div className="mt-3 sm:mt-4">
                                        <FormProvider {...verifyMethods}>
                                            <form onSubmit={(e) => e.preventDefault()} noValidate className="space-y-6">
                                                <Input {...codeValidation} ref={codeInputRef} />

                                                <button
                                                    onClick={onVerify}
                                                    type="submit"
                                                    className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                                                >
                                                    Verify
                                                </button>
                                            </form>
                                        </FormProvider>
                                    </div>

                                    <div className="mt-6 sm:mt8 text-center">
                                        <p className="text-sm text-gray-400">
                                            Didn't receive a code?{" "}
                                            {codeResent ? (
                                                <p className="inline font-semibold text-sm text-gray-400">
                                                    Code Resent
                                                </p>
                                            ) : (
                                                <button
                                                    type="button"
                                                    className="font-semibold text-sm underline text-orange-500 hover:text-orange-400"
                                                    onClick={async () => {
                                                        await signUp?.prepareEmailAddressVerification({
                                                            strategy: "email_code",
                                                        });
                                                        setCodeResent(true);
                                                        setTimeout(() => {
                                                            setCodeResent(false);
                                                        }, 20000);
                                                    }}
                                                >
                                                    Resend Code
                                                </button>
                                            )}
                                        </p>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};

export default UserSignUp;
