import { findInputError } from "./findInputError";
import { HiMiniExclamationCircle, HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { Validation } from "./inputValidation";
import { Transition } from "@headlessui/react";
import { useFormContext } from "react-hook-form";
import { useState } from "react";

const InputError = ({
    showState,
    message,
    additionalStyles,
}: {
    showState: boolean;
    message: string;
    additionalStyles?: string;
}) => {
    return (
        <div className="inline">
            <Transition
                show={showState}
                enter="transform duration-200"
                enterFrom="translate-y-3 opacity-0"
                enterTo="opacity-100"
                leave="transition duration-200"
                leaveFrom="opacity-100"
                leaveTo="translate-y-3 opacity-0"
                className={
                    "flex justify-center items-center gap-1 px-2 font-semibold text-red-600 bg-red-100 rounded-md " +
                    (additionalStyles || "text-xs")
                }
            >
                <HiMiniExclamationCircle size={16} />
                <p>{message}</p>
            </Transition>
        </div>
    );
};

const Input = ({
    label,
    type,
    id,
    autoComplete,
    validation,
    labelStyles,
    inputStyles,
    errorStyles,
}: Validation & {
    labelStyles?: string;
    inputStyles?: string;
    errorStyles?: string;
}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const [hidePassword, setHidePassword] = useState(type === "password");

    const inputError = findInputError(errors, id);
    const isInvalid = Object.keys(inputError).length > 0 ? true : false;

    return (
        <div>
            <div className="flex justify-between items-center">
                <label htmlFor={id} className={labelStyles || "block text-sm font-medium leading-6 text-gray-900"}>
                    {label}
                </label>
                {Object.keys(validation).length === 0 ? (
                    <p className="text-xs ml-4 text-gray-400 inline mr-1">Optional</p>
                ) : (
                    <InputError
                        showState={isInvalid && !!inputError}
                        message={isInvalid && inputError && inputError.error.message}
                        additionalStyles={errorStyles}
                    />
                )}
            </div>
            <div className="mt-2 relative">
                {type === "textarea" ? (
                    <textarea
                        id={id}
                        rows={4}
                        className={
                            inputStyles ||
                            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                        }
                        defaultValue={""}
                        {...register(id, validation)}
                    />
                ) : (
                    <>
                        {label === "Password" ? (
                            <>
                                <input
                                    type={hidePassword ? "password" : "text"}
                                    id={id}
                                    autoComplete={autoComplete}
                                    className={
                                        inputStyles ||
                                        "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                                    }
                                    {...register(id, validation)}
                                />
                                <button
                                    className="absolute inset-y-0 right-0 flex items-center px-3"
                                    onClick={() => {
                                        setHidePassword(!hidePassword);
                                    }}
                                >
                                    {hidePassword ? (
                                        <HiOutlineEye className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    ) : (
                                        <HiOutlineEyeSlash className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    )}
                                </button>
                            </>
                        ) : (
                            <input
                                type={type}
                                id={id}
                                autoComplete={autoComplete}
                                className={
                                    inputStyles ||
                                    "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                                }
                                {...register(id, validation)}
                            />
                        )}
                    </>
                )}
                {/* {type === "password" && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <HiEye className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                )} */}
            </div>
        </div>
    );
};

export default Input;
