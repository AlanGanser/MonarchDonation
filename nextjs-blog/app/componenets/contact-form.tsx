"use client";

import { FormProvider, useForm } from "react-hook-form";
import { nameValidation, subjectValidation, messageValidation, emailValidation } from "./form/inputValidation";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import { HiMiniCheckCircle } from "react-icons/hi2";
import Input from "./form/input";

const styles = {
    labelStyles: "text-base font-semibold",
    inputStyles: "block w-full rounded-md border-gray-300 px-4 py-3 placeholder-gray-500 shadow-sm focus:border-primary-300 focus:ring-primary-300",
    errorStyles: "text-base",
}


const Form = () => {
    const methods = useForm();
    const [success, setSuccess] = useState(false);
    const { labelStyles, inputStyles, errorStyles } = styles

    const onSubmit = methods.handleSubmit((data) => {
        console.log(data);
        methods.reset();
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        }, 5000);
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={(e) => e.preventDefault()} noValidate className="flex flex-col gap-y-6">
                <Input {...nameValidation} labelStyles={labelStyles} inputStyles={inputStyles} errorStyles={errorStyles} />
                <Input {...emailValidation} labelStyles={labelStyles} inputStyles={inputStyles} errorStyles={errorStyles} />
                <Input {...subjectValidation} labelStyles={labelStyles} inputStyles={inputStyles} errorStyles={errorStyles} />
                <Input {...messageValidation} labelStyles={labelStyles} inputStyles={inputStyles} errorStyles={errorStyles} />
                <div className="flex flex-col items-center md:flex-row md:justify-between gap-y-6">
                    <button
                        onClick={onSubmit}
                        className="flex w-full justify-center rounded-md border border-transparent bg-primary-300 px-3.5 py-2.5 text-base font-semibold text-white shadow-sm md:w-auto hover:bg-secondary transition disabled:bg-orange-300 disabled:text-grey-800"
                    >
                        Submit
                    </button>
                    <Transition
                        show={success}
                        enter="transform duration-200"
                        enterFrom="translate-y-3 opacity-0"
                        enterTo="opacity-100"
                        leave="transition duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="translate-y-3 opacity-0"
                        className="inline-flex w-full md:w-auto items-center justify-center gap-1 px-2 font-semibold text-green-500 bg-green-100 rounded-md"
                    >
                        <HiMiniCheckCircle /> Form has been submitted successfully
                    </Transition>
                </div>
                {/* <div className="bg-white ">  */}
                {/* MAKE A DIV THAT BASICALLY SAVES SPACE FOR THE TRANSITITON */}
                {/* </div> */}
            </form>
        </FormProvider>
    );
};

export default Form;
