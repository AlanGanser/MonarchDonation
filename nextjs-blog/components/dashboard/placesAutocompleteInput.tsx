import React, { forwardRef } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import { Combobox } from "@headlessui/react";
import { HiCheck, HiChevronUpDown } from "react-icons/hi2";
import { BsExclamationLg } from "react-icons/bs";
import { RefCallBack } from "react-hook-form";

const classNames = (...classes: any) => {
    return classes.filter(Boolean).join(" ");
};

const PlacesAutocompleteInput = forwardRef<
    HTMLInputElement,
    {
        onSet: (value: string) => void;
        name: string;
        errorMessage: string | undefined;
        controllerValue: string | undefined;
    }
>(({ onSet, name, errorMessage, controllerValue }, ref) => {
    const {
        ready,
        setValue,
        suggestions: { data },
    } = usePlacesAutocomplete({
        debounce: 300,
    });

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleSelect = (value: string) => {
        setValue(value, false);
        onSet(value);
    };

    return (
        <>
            <Combobox as="div" disabled={!ready} value={controllerValue} name={name} onChange={handleSelect}>
                <div className="flex justify-between items-center">
                    <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">
                        Address
                    </Combobox.Label>
                    {errorMessage && (
                        <div className="inline-flex justify-center items-center gap-1 px-2 font-semibold text-red-600 bg-red-100 rounded-md text-xs">
                            <BsExclamationLg size={16} className="flex-shrink-0" />
                            <p>{errorMessage}</p>
                        </div>
                    )}
                </div>
                <div className="relative mt-2">
                    <Combobox.Input
                        className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 placeholder:text-gray-600 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                        displayValue={(value: string) => value}
                        onChange={handleInput}
                        autoComplete="off"
                        ref={ref}
                    />

                    <div className="absolute inset-y-0 right-0 flex items-center">
                        <Combobox.Button className="flex items-center rounded-r-md px-2 focus:outline-none">
                            <HiChevronUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </Combobox.Button>
                    </div>

                    {data.length > 0 ? (
                        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {data.map(({ place_id, description }) => (
                                <Combobox.Option
                                    key={place_id}
                                    value={description}
                                    className={({ active }) =>
                                        classNames(
                                            "relative cursor-default select-none py-2 pl-3 pr-9",
                                            active ? "bg-orange-500 text-white" : "text-gray-900"
                                        )
                                    }
                                >
                                    {({ active, selected }) => (
                                        <>
                                            <span className={classNames("block truncate", selected && "font-semibold")}>
                                                {description}
                                            </span>

                                            {selected && (
                                                <span
                                                    className={classNames(
                                                        "absolute inset-y-0 right-0 flex items-center pr-4",
                                                        active ? "text-white" : "text-orange-500"
                                                    )}
                                                >
                                                    <HiCheck className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            )}
                                        </>
                                    )}
                                </Combobox.Option>
                            ))}
                        </Combobox.Options>
                    ) : (
                        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            <span className="relative cursor-default select-none py-1 pl-3 pr-9 text-gray-500 italic block truncate">
                                No address found
                            </span>
                        </Combobox.Options>
                    )}
                </div>
            </Combobox>
        </>
    );
});

export default PlacesAutocompleteInput;
