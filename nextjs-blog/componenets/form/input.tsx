import { findInputError } from "./findInputError";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { BsExclamationLg } from "react-icons/bs";
import { Validation } from "./inputValidation";
import { Transition } from "@headlessui/react";
import { useFormContext } from "react-hook-form";
import { useState, forwardRef, MutableRefObject, useImperativeHandle, useRef } from "react";

export const InputError = ({ showState, message }: { showState: boolean; message: string }) => {
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
                    "flex justify-center items-center gap-1 px-2 font-semibold text-red-600 bg-red-100 rounded-md"
                }
            >
                <BsExclamationLg size={16} className="flex-shrink-0" />
                <p>{message}</p>
            </Transition>
        </div>
    );
};

interface params extends Validation {
    labelStyles?: string;
    inputStyles?: string;
    placeholder?: string;
}

const Input = forwardRef<HTMLInputElement, params>(
    (
        { label, type, id, autoComplete, validation, labelStyles, inputStyles, placeholder }: params,
        forwardedRef
    ) => {
        const {
            register,
            formState: { errors },
        } = useFormContext();

        const { ref, ...restRegister } = register(id, validation);

        const inputRef = useRef<HTMLInputElement>(null);

        useImperativeHandle(ref, () => inputRef.current);
        useImperativeHandle(forwardedRef, () => inputRef.current as HTMLInputElement);

        const [hidePassword, setHidePassword] = useState(type === "password");

        const inputError = findInputError(errors, id);
        const isInvalid = Object.keys(inputError).length > 0;

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
                        />
                    )}
                </div>
                <div className="mt-2 relative">
                    {((id === "password" || id === "newPassword") && (
                        <>
                            <input
                                ref={inputRef}
                                type={hidePassword ? "password" : "text"}
                                id={id}
                                autoComplete={autoComplete}
                                placeholder={placeholder}
                                className={
                                    inputStyles ||
                                    "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                                }
                                {...restRegister}
                            />
                            <button
                                className="absolute inset-y-0 right-0 flex items-center px-3"
                                onClick={() => {
                                    setHidePassword(!hidePassword);
                                }}
                                type="button"
                            >
                                {hidePassword ? (
                                    <HiOutlineEye className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                ) : (
                                    <HiOutlineEyeSlash className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                )}
                            </button>
                        </>
                    )) ||
                        (id === "otp" && (
                            <input
                                ref={inputRef}
                                type={type}
                                id={id}
                                autoComplete={autoComplete}
                                placeholder={placeholder}
                                className={
                                    inputStyles ||
                                    "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                                }
                                {...restRegister}
                            />
                        )) || (
                            <input
                                ref={inputRef}
                                type={type}
                                id={id}
                                autoComplete={autoComplete}
                                placeholder={placeholder}
                                className={
                                    inputStyles ||
                                    "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                                }
                                {...restRegister}
                            />
                        )}
                </div>
            </div>
        );
    }
);

export default Input;
