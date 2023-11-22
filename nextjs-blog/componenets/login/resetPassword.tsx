"use client";

import { FormProvider, useForm } from "react-hook-form";
import Input from "../form/input";
import { codeValidation, emailValidation, newPasswordValidation, passwordValidation } from "../form/inputValidation";
import { BsExclamationLg } from "react-icons/bs";
import { useSignIn } from "@clerk/nextjs";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { HiXMark } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User } from "@clerk/nextjs/dist/types/server";

const errorMessages = {
    form_identifier_not_found: "An account with this email address does not exist",
};
const verificationErrorMessages = {
    form_code_incorrect: "Incorrect code, please re-enter the code",
    verification_failed: "Too many attempts, please restart the sign-up process",
};

const ResetPassword = () => {
    const [userEmail, setUserEmail] = useState("");
    const codeInputRef = useRef(null);
    const [codeResent, setCodeResent] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const [newPasswordErr, setNewPasswordErr] = useState("");
    const [showNewPasswordDialog, setShowNewPasswordDialog] = useState(false);
    const router = useRouter();

    const emailFormMethods = useForm();
    const passwordFormMethods = useForm();

    const { isLoaded, signIn, setActive } = useSignIn();

    const onSubmit = emailFormMethods.handleSubmit(async ({ email }) => {
        if (!isLoaded) return;

        try {
            await signIn?.create({
                strategy: "reset_password_email_code",
                identifier: email,
            });
            setUserEmail(email);
            setErrMessage("");
            setShowNewPasswordDialog(true);
        } catch (err: any) {
            if (errorMessages.hasOwnProperty(err.errors[0].code)) {
                setErrMessage(errorMessages[err.errors[0].code as keyof typeof errorMessages]);
            } else {
                setErrMessage(err.errors[0].message);
            }
        }
    });

    const onResetPassword = passwordFormMethods.handleSubmit(async ({ newPassword, otp }) => {
        if (!isLoaded) return;

        try {
            const result = await signIn?.attemptFirstFactor({
                strategy: "reset_password_email_code",
                code: otp,
                password: newPassword,
            });
            if (result.status === "complete") {
                setActive({ session: result.createdSessionId });
                router.push("/dashboard");
            }
        } catch (err: any) {
            if (verificationErrorMessages.hasOwnProperty(err.errors[0].code)) {
                setNewPasswordErr(
                    verificationErrorMessages[err.errors[0].code as keyof typeof verificationErrorMessages]
                );
            } else {
                setNewPasswordErr(err.errors[0].message);
            }
        }
    });

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center pt-5 pb-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                />{" "}
                {/* TODO change img */}
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Reset your password
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

                    <FormProvider {...emailFormMethods}>
                        <form onSubmit={(e) => e.preventDefault()} noValidate className="space-y-6">
                            <Input {...emailValidation} />

                            <button
                                onClick={onSubmit}
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                            >
                                Send a reset code
                            </button>
                        </form>
                    </FormProvider>

                    <Transition.Root show={showNewPasswordDialog} as={Fragment}>
                        <Dialog
                            as="div"
                            className="relative z-10"
                            initialFocus={codeInputRef}
                            onClose={() => {
                                setShowNewPasswordDialog(false);
                                setNewPasswordErr("");
                                passwordFormMethods.reset();
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
                                                        setShowNewPasswordDialog(false);
                                                        setNewPasswordErr("");
                                                        passwordFormMethods.reset();
                                                    }}
                                                >
                                                    <span className="sr-only">Close</span>
                                                    <HiXMark className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>

                                            <div className="text-center">
                                                <Dialog.Title
                                                    as="h3"
                                                    className="text-lg font-semibold leading-6 text-gray-900"
                                                >
                                                    Set your new password
                                                </Dialog.Title>
                                                <Dialog.Description>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-gray-500">
                                                            Enter the code you received at{" "}
                                                            <span className="text-gray-900 font-semibold">
                                                                {userEmail}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </Dialog.Description>
                                            </div>

                                            {newPasswordErr && (
                                                <div className="flex justify-center items-center gap-1 py-1 px-2 mt-5 font-semibold font-base text-red-600 bg-red-100 rounded-md text-sm">
                                                    <BsExclamationLg size={25} className="h-5 w-5 mr-3 flex-shrink-0" />
                                                    <p className="text-center">{newPasswordErr}</p>
                                                </div>
                                            )}

                                            <div className="mt-5 sm:mt-6">
                                                <FormProvider {...passwordFormMethods}>
                                                    <form
                                                        onSubmit={(e) => e.preventDefault()}
                                                        noValidate
                                                        className="space-y-6"
                                                    >
                                                        <Input {...codeValidation} ref={codeInputRef} />

                                                        <Input {...newPasswordValidation} />

                                                        <button
                                                            onClick={onResetPassword}
                                                            type="submit"
                                                            className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                                                        >
                                                            Set password
                                                        </button>
                                                    </form>
                                                </FormProvider>
                                            </div>

                                            <div className="mt-8 text-center">
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
                                                                await signIn?.create({
                                                                    strategy: "reset_password_email_code",
                                                                    identifier: userEmail,
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
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
