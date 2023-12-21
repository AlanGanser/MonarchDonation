"use client";

import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../form/input";
import { passwordValidation, usernameValidation } from "../form/inputValidation";

const styles = {
    labelStyles: "",
    inputStyles: "",
};

const AdminLogin = () => {
    const methods = useForm();
    const { labelStyles, inputStyles } = styles;

    const onSubmit = methods.handleSubmit((data) => {
        methods.reset();
    });

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Image
                    className="mx-auto h-10 w-auto"
                    src="/../public/images/test-logo.png"
                    alt="Your Company"
                    height={100}
                    width={100}
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in as admin
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <FormProvider {...methods}>
                    <form onSubmit={e => e.preventDefault()} noValidate className="space-y-6">
                        <Input
                            {...usernameValidation}
                            labelStyles={labelStyles}
                            inputStyles={inputStyles}
                        />
                        <Input
                            {...passwordValidation}
                            labelStyles={labelStyles}
                            inputStyles={inputStyles}
                        />

                        <div>
                            <button
                                onClick={onSubmit}
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </FormProvider>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Forgot username or password? Ask another admin
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
