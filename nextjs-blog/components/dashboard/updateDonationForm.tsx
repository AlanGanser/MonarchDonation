"use client";

import { HiCheck, HiChevronUpDown, HiXMark } from "react-icons/hi2";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { LatLng, getGeocode, getLatLng } from "use-places-autocomplete";
import { checkInside, donationAreaPolygon } from "../general/intersectsPolygon";
import { LoadScriptProps, Marker, useJsApiLoader } from "@react-google-maps/api";
import PlacesAutocompleteInput from "./placesAutocompleteInput";
import AddressMap from "./addressMap";
import Calendar from "./calendar";
import { useState, Fragment, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Listbox, Transition } from "@headlessui/react";
import { useMediaQuery } from "react-responsive"; // TODO Delete Library
import { BsExclamationLg } from "react-icons/bs";
import LoadingSpinner from "../general/loadingSpinner";
import { getNextAvailableTime } from "./availableTimes";
import { Donation, Item } from "@prisma/client";
import { updateDonation } from "./actions";
import { User } from "@clerk/nextjs/dist/types/server";
import { toDate } from "date-fns";
import Link from "next/link";

const libraries: LoadScriptProps["libraries"] = ["places"];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

const UpdateDonationFrom = ({
    user,
    today,
    unavailableDateTimes,
    donation,
    items,
}: {
    user: User;
    today: Date;
    unavailableDateTimes: Date[] | undefined;
    donation: Donation;
    items: Item[];
}) => {
    // I use state for values that aren't controlled by react-hook-form and don't need to be subitted
    const [coordinates, setCoordinates] = useState<LatLng | null>(null);

    const [isPending, startTransition] = useTransition();
    const [show, setShow] = useState(false)

    const itemCatagories = ["Clothing", "Food", "Hygiene", "Home supplies", "Other"] as const;

    const item = z.object({
        id: z.string().optional(),
        catagory: z.enum(itemCatagories),
        name: z.string().min(1, { message: "required" }).max(20, { message: "must not be over 20 characters" }),
        quantity: z.coerce
            .number()
            .int({ message: "integers only" })
            .gte(1, { message: "must be at least 1" })
            .lte(15, { message: "must not be over 15" }),
    });

    type ItemSchema = z.infer<typeof item>;

    const form = z.object({
        items: z.array(item).min(1),
        date: z.number(),
        address: z
            .string()
            .min(1, { message: "required" })
            .refine(
                async (address) => {
                    try {
                        const results = await getGeocode({ address });
                        const { lat, lng } = await getLatLng(results[0]);
                        return checkInside(donationAreaPolygon, lng, lat);
                    } catch (err) {
                        if (err !== "INVALID_REQUEST") {
                            throw err;
                        }
                    }
                },
                { message: "your address is not within our pickup area" }
            ),
    });

    type FormSchema = z.infer<typeof form>;

    const {
        control,
        register,
        reset,
        handleSubmit,
        formState: { errors, isDirty },
    } = useForm<FormSchema>({
        resolver: zodResolver(form),
        defaultValues: {
            items: items as ItemSchema[],
            date: donation.startTime?.valueOf() || getNextAvailableTime(today, unavailableDateTimes).valueOf(),
            address: donation.address,
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "items",
    });

    const { isLoaded } = useJsApiLoader({
        id: "script-loader",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: "weekly",
        libraries,
    });

    const onSubmit = handleSubmit(async ({ address, date, items }) => {
        try {
            await updateDonation(donation.id, address, toDate(date), items);
            reset({ address, date, items });
            setShow(true);
        } catch (err) {
            throw err;
        }
    });

    const { ref: itemsRef } = register("items");

    return (
        <>
            <form onSubmit={(e) => e.preventDefault()} noValidate>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="flex justify-between items-center">
                            <div className="flex flex-wrap justify-start gap-3 items-center">
                                <h1
                                    tabIndex={-1}
                                    className="text-base font-semibold leading-6 text-gray-900"
                                    ref={itemsRef}
                                >
                                    Donation items
                                </h1>
                                {errors.items?.root?.message && (
                                    <div className="flex justify-center items-center gap-1 font-semibold py-1 px-2 bg-red-100 rounded-md font-base text-red-600 text-sm">
                                        <BsExclamationLg size={15} className="mr-3 flex-shrink-0" />
                                        <p className="text-center">{errors.items?.root?.message}</p>
                                    </div>
                                )}
                            </div>

                            <button
                                type="button"
                                className="block rounded-md bg-green-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
                                onClick={() => {
                                    append({ name: "", catagory: "Other", quantity: 1 });
                                }}
                            >
                                Add item
                            </button>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {fields.length < 1 ? (
                                <p className="pl-3 text-gray-500 italic mt-4">No items have been added yet</p>
                            ) : (
                                fields.map((field, index) => (
                                    <ul
                                        role="list"
                                        key={field.id}
                                        className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-4"
                                    >
                                        <li className="col-span-1">
                                            <div className="flex justify-between items-center mb-2">
                                                <label
                                                    htmlFor={`items.${index}.name`}
                                                    className="block text-sm py-1 font-medium leading-6 text-gray-900"
                                                >
                                                    Name
                                                </label>
                                                {errors?.items && errors.items[index]?.name && (
                                                    <div className="flex justify-center items-center gap-1 font-semibold py-1 px-2 bg-red-100 rounded-md font-base text-red-600 text-sm">
                                                        <BsExclamationLg size={15} className="mr-3 flex-shrink-0" />
                                                        <p className="text-center">
                                                            {errors.items[index]?.name?.message}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                            <input
                                                autoComplete="off"
                                                key={`${field.id}.name`}
                                                id={`items.${index}.name`}
                                                {...register(`items.${index}.name`)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                                            />
                                        </li>
                                        <li className="col-span-1">
                                            <Controller
                                                render={({ field: { onChange, ref, value } }) => (
                                                    <Listbox
                                                        value={value}
                                                        onChange={onChange}
                                                        key={`${field.id}.catagory`}
                                                    >
                                                        {({ open }) => (
                                                            <>
                                                                <div className="flex justify-between items-center mb-2">
                                                                    <Listbox.Label className="block py-1 text-sm font-medium leading-6 text-gray-900">
                                                                        Catagory
                                                                    </Listbox.Label>
                                                                    {errors?.items && errors.items[index]?.catagory && (
                                                                        <div className="flex justify-center items-center gap-1 py-1 px-2 font-semibold font-base text-red-600 bg-red-100 rounded-md text-sm mb-4">
                                                                            <BsExclamationLg
                                                                                size={15}
                                                                                className="mr-3 flex-shrink-0"
                                                                            />
                                                                            <p className="text-center">
                                                                                {errors.items[index]?.catagory?.message}
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="relative">
                                                                    <Listbox.Button
                                                                        ref={ref}
                                                                        className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm sm:leading-6"
                                                                    >
                                                                        <span className="block truncate">{value}</span>
                                                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                                            <HiChevronUpDown
                                                                                className="h-5 w-5 text-gray-400"
                                                                                aria-hidden="true"
                                                                            />
                                                                        </span>
                                                                    </Listbox.Button>

                                                                    <Transition
                                                                        show={open}
                                                                        as={Fragment}
                                                                        leave="transition ease-in duration-100"
                                                                        leaveFrom="opacity-100"
                                                                        leaveTo="opacity-0"
                                                                    >
                                                                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                                            {itemCatagories.map((catagory) => (
                                                                                <Listbox.Option
                                                                                    key={catagory}
                                                                                    className={({ active }) =>
                                                                                        classNames(
                                                                                            active
                                                                                                ? "bg-orange-500 text-white"
                                                                                                : "text-gray-900",
                                                                                            "relative cursor-default select-none py-2 pl-3 pr-9"
                                                                                        )
                                                                                    }
                                                                                    value={catagory}
                                                                                >
                                                                                    {({ selected, active }) => (
                                                                                        <>
                                                                                            <span
                                                                                                className={classNames(
                                                                                                    selected
                                                                                                        ? "font-semibold"
                                                                                                        : "font-normal",
                                                                                                    "block truncate"
                                                                                                )}
                                                                                            >
                                                                                                {catagory}
                                                                                            </span>

                                                                                            {selected ? (
                                                                                                <span
                                                                                                    className={classNames(
                                                                                                        active
                                                                                                            ? "text-white"
                                                                                                            : "text-orange-500",
                                                                                                        "absolute inset-y-0 right-0 flex items-center pr-4"
                                                                                                    )}
                                                                                                >
                                                                                                    <HiCheck
                                                                                                        className="h-5 w-5"
                                                                                                        aria-hidden="true"
                                                                                                    />
                                                                                                </span>
                                                                                            ) : null}
                                                                                        </>
                                                                                    )}
                                                                                </Listbox.Option>
                                                                            ))}
                                                                        </Listbox.Options>
                                                                    </Transition>
                                                                </div>
                                                            </>
                                                        )}
                                                    </Listbox>
                                                )}
                                                name={`items.${index}.catagory`}
                                                control={control}
                                            />
                                        </li>
                                        <li className="col-span-1">
                                            <div className="flex justify-between items-center mb-2">
                                                <label
                                                    htmlFor={`items.${index}.quantity`}
                                                    className="block text-sm py-1 font-medium leading-6 text-gray-900"
                                                >
                                                    Quantity
                                                </label>
                                                {errors?.items && errors.items[index]?.quantity && (
                                                    <div className="flex justify-center items-center gap-1 font-semibold py-1 px-2 bg-red-100 rounded-md font-base text-red-600 text-sm">
                                                        <BsExclamationLg size={15} className="mr-3 flex-shrink-0" />
                                                        <p className="text-center">
                                                            {errors.items[index]?.quantity?.message}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                            <input
                                                autoComplete="off"
                                                key={`${field.id}.quantity`}
                                                id={`items.${index}.quantity`}
                                                type="number"
                                                {...register(`items.${index}.quantity`)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                                            />
                                        </li>
                                        <li className="col-span-1 flex md:justify-end items-end">
                                            <button
                                                className="rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                                onClick={() => remove(index)}
                                            >
                                                Delete
                                                <span className="sr-only">Delete {field.name}</span>
                                            </button>
                                        </li>
                                    </ul>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">Schedule pickup</h1>
                        <Controller
                            name="date"
                            control={control}
                            render={({ field: { onChange, ref, value } }) => (
                                <Calendar
                                    today={today}
                                    unavailableDateTimes={unavailableDateTimes}
                                    onChange={onChange}
                                    value={value}
                                    ref={ref}
                                />
                            )}
                        />
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">Select a pickup address</h1>

                        {isLoaded ? (
                            <div className="mt-8">
                                <Controller
                                    name="address"
                                    control={control}
                                    render={({ field: { onChange, name, ref, value } }) => (
                                        <PlacesAutocompleteInput
                                            onSet={async (value) => {
                                                onChange(value);
                                                if (value) {
                                                    const results = await getGeocode({ address: value });
                                                    const { lat, lng } = await getLatLng(results[0]);
                                                    setCoordinates({ lat, lng });
                                                }
                                            }}
                                            name={name}
                                            errorMessage={
                                                errors.address?.type === "invalid_type"
                                                    ? "Please enter your address"
                                                    : errors.address?.message
                                            }
                                            ref={ref}
                                            controllerValue={value}
                                        />
                                    )}
                                />
                                <div className="w-full h-[400px] mt-6">
                                    <AddressMap>{coordinates && <Marker position={coordinates} />}</AddressMap>
                                </div>
                            </div>
                        ) : (
                            <div className="animate-pulse mt-8">
                                <div className="h-6 w-20 bg-gray-200 rounded" />
                                <div className="h-9 w-full bg-gray-200 rounded mt-2" />
                                <div className="h-[400px] w-full bg-gray-200 rounded mt-6" />
                            </div>
                        )}
                    </div>

                    <div
                        aria-live="assertive"
                        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:p-6 z-50"
                    >
                        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                            <Transition
                                show={isDirty}
                                as={Fragment}
                                enter="transform ease-out duration-300 transition"
                                enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                                enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="py-2 px-5">
                                        <div className="flex items-center">
                                            <div className="flex w-0 flex-1 justify-between items-center">
                                                <p className="w-0 flex-1 text-sm font-medium text-gray-900 flex-shrink-0">
                                                    Unsaved changes.
                                                </p>

                                                {isPending ? (
                                                    <div className="px-3 py-2.5 flex-shrink-0">
                                                        <LoadingSpinner />
                                                    </div>
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() => reset()}
                                                            type="button"
                                                            className="ml-3 flex-shrink-0 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                        >
                                                            Reset
                                                        </button>
                                                        <button
                                                            onClick={() => startTransition(() => onSubmit())}
                                                            type="button"
                                                            className="ml-3 flex-shrink-0 rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600"
                                                        >
                                                            Save Changes
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Transition>
                        </div>
                    </div>
                </div>
            </form>
            <div
                aria-live="assertive"
                className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
            >
                <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                    {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
                    <Transition
                        show={show}
                        as={Fragment}
                        enter="transform ease-out duration-300 transition"
                        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="p-4">
                                <div className="flex items-center">
                                    <div className="flex w-0 flex-1 justify-between">
                                        <p className="w-0 flex-1 text-sm font-medium text-gray-900">
                                            Donation saved
                                        </p>
                                        <Link
                                            href="/dashboard"
                                            className="ml-3 flex-shrink-0 rounded-md bg-white text-sm font-medium text-orange-600 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                                        >
                                            Return to Dashboard
                                        </Link>
                                    </div>
                                    <div className="ml-4 flex flex-shrink-0">
                                        <button
                                            type="button"
                                            className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                                            onClick={() => {
                                                setShow(false);
                                            }}
                                        >
                                            <span className="sr-only">Close</span>
                                            <HiXMark className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </>
    );
};

export default UpdateDonationFrom;
