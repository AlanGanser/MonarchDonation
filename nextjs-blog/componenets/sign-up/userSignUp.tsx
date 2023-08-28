"use client";

import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../form/input";
import { firstNameValidation, lastNameValidation, emailValidation, passwordValidation } from "../form/inputValidation";
import { Dialog, Transition } from '@headlessui/react'
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useState, Fragment } from "react";

const errorMessages = {
    CredentialsSignin: {
        title: "Wrong Credentials",
        sub: "Invalid email or password",
    },
};

const UserSignUp = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [pendingVerification, setPendingVerification] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("search");
    // const error = searchParams.get("error") as "CredentialsSignin" | null; // TODO
    const methods = useForm();

    const onSubmit = methods.handleSubmit(async ({ email, password, firstName, lastName }) => {
        // console.log(data); // email, firstName, lastName, password
        if (!isLoaded) {
            return;
        }

        try {
            await signUp.create({
                firstName,
                lastName,
                emailAddress: email,
                password,
            });

            // send the email.
            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

            // change the UI to pending section.
            setUserEmail(email);
            setPendingVerification(true);
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
        }
    });

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center pt-5 pb-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                    />{" "}
                    {/* TODO change img */}
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Create your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-8 shadow sm:rounded-lg sm:px-12">
                        {/* {error && (
                            <div className="flex justify-center items-center gap-1 py-1 px-2 font-semibold text-red-600 bg-red-100 rounded-md text-sm mb-6">
                                <HiMiniExclamationCircle />
                                <p>
                                    {errorMessages[error].sub}
                                </p>
                            </div>
                        )} */}
                        <FormProvider {...methods}>
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
                                <Input {...passwordValidation} />

                                <div className="text-sm leading-6">
                                    <a href="#" className="font-semibold text-orange-500 hover:text-orange-400">
                                        Forgot password?
                                    </a>
                                </div>

                                <div>
                                    <button
                                        onClick={onSubmit}
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                                    >
                                        Sign up
                                    </button>
                                </div>
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
                                <button className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white shadow-sm px-3 py-1.5 text-gray-700">
                                    <FcGoogle size={20} />
                                    <span className="text-sm font-semibold leading-6">Continue with Google</span>
                                </button>
                                <button className="flex w-full items-center justify-center gap-3 rounded-md bg-[#1877F2] shadow-sm px-3 py-1.5 text-white">
                                    <BsFacebook size={20} />
                                    <span className="text-sm font-semibold leading-6">Continue with Facebook</span>
                                </button>
                            </div>
                            <p className="mt-9 text-center text-sm text-gray-400">
                                Have an account?{" "}
                                <a
                                    href="/sign-in"
                                    className="font-semibold leading-6 text-orange-500 hover:text-orange-400"
                                >
                                    Sign In
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Transition.Root show={pendingVerification} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setPendingVerification}>
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
                                    <div>
                                        <div className="text-center">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg font-semibold leading-6 text-gray-900"
                                            >
                                                Eamil verification
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Enter the code you recieved at <span className="text-gray-900 font-semibold">{userEmail}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                                            onClick={() => setPendingVerification(false)}
                                        >
                                            Verify code
                                        </button>
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
