import { findInputError } from "./findInputError";
import { HiMiniExclamationCircle } from "react-icons/hi2";
import { Validation } from "./inputValidation";
import { Transition } from "@headlessui/react";
import { useFormContext } from "react-hook-form";

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
                    "flex items-center gap-1 px-2 font-semibold text-red-600 bg-red-100 rounded-md " +
                    (additionalStyles || "text-sm")
                }
            >
                <HiMiniExclamationCircle />
                {message}
            </Transition>
        </div>
    );
};

const Input = ({
    label,
    type,
    id,
    placeholder,
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

    const inputError = findInputError(errors, id);
    const isInvalid = Object.keys(inputError).length > 0 ? true : false;

    return (
        <div>
            <div className="flex justify-between items-center">
                <label htmlFor={id} className={labelStyles || "block text-sm font-medium leading-6 text-gray-900"}>
                    {label}
                </label>
                <InputError
                    showState={isInvalid && !!inputError}
                    message={isInvalid && inputError && inputError.error.message}
                    additionalStyles={errorStyles}
                />
            </div>
            <div className="mt-2">
                {type === "textarea" ? (
                    <textarea
                        id={id}
                        rows={4}
                        className={inputStyles || "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"}
                        placeholder={placeholder}
                        defaultValue={""}
                        {...register(id, validation)}
                    />
                ) : (
                    <input
                        type={type}
                        id={id}
                        autoComplete={autoComplete}
                        className={inputStyles || "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"}
                        placeholder={placeholder}
                        {...register(id, validation)}
                    />
                )}
            </div>
        </div>
    );
};

export default Input;
