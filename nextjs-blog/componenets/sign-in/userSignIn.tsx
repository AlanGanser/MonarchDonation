"use client";

import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../form/input";
import { passwordValidation, emailValidation } from "../form/inputValidation";
import { useSearchParams } from "next/navigation";
import { HiMiniExclamationCircle } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { useSignIn } from "@clerk/nextjs";

const errorMessages = {
    CredentialsSignin: {
        title: "Wrong Credentials",
        sub: "Invalid email or password",
    },
};

const UserSignIn = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("search");
    // const error = searchParams.get("error") as "CredentialsSignin" | null; // TODO
    const methods = useForm();

    const onSubmit = methods.handleSubmit((data) => {
        //TODO
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
                        Sign in to your account
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
                                <Input {...emailValidation} />

                                <Input {...passwordValidation} />

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                                        />
                                        <label
                                            htmlFor="remember-me"
                                            className="ml-3 block text-sm leading-6 text-gray-900"
                                        >
                                            Remember me
                                        </label>
                                    </div>

                                    <div className="text-sm leading-6">
                                        <a href="#" className="font-semibold text-orange-500 hover:text-orange-400">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        onClick={onSubmit}
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                                    >
                                        Sign in
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
                                <button className="flex w-full items-center justify-center gap-3 rounded-md border bg-[#1877F2] shadow-sm px-3 py-1.5 text-white">
                                    <BsFacebook size={20} />
                                    <span className="text-sm font-semibold leading-6">Continue with Facebook</span>
                                </button>
                            </div>
                            <p className="mt-9 text-center text-sm text-gray-400">
                                Don't have an account?{" "}
                                <a href="/sign-up" className="font-semibold leading-6 text-orange-500 hover:text-orange-400">
                                    Sign Up
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserSignIn;
