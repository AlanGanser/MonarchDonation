"use client";

import ProfileImage from "./profileImage";
import { Controller, useForm } from "react-hook-form";
import { Fragment, useContext, useEffect, useState } from "react";
import { z } from "zod";
import { LatLng, getGeocode, getLatLng } from "use-places-autocomplete";
import { checkInside, donationAreaPolygon } from "../general/intersectsPolygon";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadScriptProps, Marker, useJsApiLoader } from "@react-google-maps/api";
import PlacesAutocompleteInput from "./placesAutocompleteInput";
import AddressMap from "./addressMap";
import { Switch, Transition } from "@headlessui/react";
import { User } from "@clerk/nextjs/dist/types/server";
import { updateUser } from "./actions";
import { useTransition } from "react";
import LoadingSpinner from "../general/loadingSpinner";

const libraries: LoadScriptProps["libraries"] = ["places"];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

const ProfileForm = ({ user, defaultAddress }: { user: User; defaultAddress: string | null }) => {
    const [coordinates, setCoordinates] = useState<LatLng | null>(null);
    const [isPending, startTransition] = useTransition();

    const addressEnabled = z.object({
        addressToggle: z.literal<boolean>(true),
        address: z.string().min(1, { message: "required" }).refine(
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
            { message: "Your address is not within our pickup area" }
        ),
    });

    const addressDisabled = z.object({
        addressToggle: z.literal<boolean>(false),
        address: z.string().optional(),
    });

    const form = z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        addressField: z.union([addressEnabled, addressDisabled]),
    });

    type FormSchema = z.infer<typeof form>;

    const {
        control,
        register,
        reset,
        handleSubmit,
        formState: { errors, isDirty },
        setValue,
        watch,
    } = useForm<FormSchema>({
        resolver: zodResolver(form),
        defaultValues: {
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            addressField: defaultAddress
                ? { addressToggle: true, address: defaultAddress }
                : { addressToggle: false, address: "" },
        },
    });

    const watchAddressToggle = watch("addressField.addressToggle");

    const onSubmit = handleSubmit(async ({ addressField: { addressToggle, address }, firstName, lastName }) => {
        try {
            const newAddress = addressToggle ? address : "";
            await updateUser(user.id, { address: newAddress, firstName, lastName });
            reset({ addressField: { addressToggle, address }, firstName, lastName });
        } catch (err) {
            throw err;
        }
    });

    const { isLoaded } = useJsApiLoader({
        id: "script-loader",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: "weekly",
        libraries,
    });

    return (
        <form onSubmit={(e) => e.preventDefault()} noValidate>
            <div className="space-y-12">
                <div className="grid grid-cols-1 gap-x-8 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            This information will be displayed publicly so be careful what you share.
                        </p>
                    </div>

                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                        <div className="col-span-full">
                            <ProfileImage user={user} />
                        </div>

                        <div className="sm:col-span-3">
                            <div className="flex justify-between items-center">
                                <label
                                    htmlFor="firstName"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    First name
                                </label>
                                <p className="text-xs ml-4 text-gray-400 inline mr-1">Optional</p>
                            </div>
                            <input
                                id="firstName"
                                {...register("firstName")}
                                className="block w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div className="sm:col-span-3">
                            <div className="flex justify-between items-center">
                                <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                                    Last name
                                </label>
                                <p className="text-xs ml-4 text-gray-400 inline mr-1">Optional</p>
                            </div>
                            <input
                                id="lastName"
                                {...register("lastName")}
                                className="block w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div className="sm:col-span-4">
                            <div className="flex justify-between items-center">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <p className="text-xs ml-4 text-gray-400 inline mr-1">Permanent</p>
                            </div>
                            <input
                                id="email"
                                disabled
                                defaultValue={user.emailAddresses[0].emailAddress}
                                className="block w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Use a permanent address where we can pick up your donations.
                        </p>
                    </div>

                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                        <div className="col-span-full">
                            <Controller
                                name="addressField.addressToggle"
                                control={control}
                                render={({ field: { onChange, ref, value } }) => (
                                    <Switch.Group as="div" className="flex items-center justify-between">
                                        <span className="flex flex-grow flex-col">
                                            <Switch.Label
                                                as="span"
                                                className="text-sm font-medium leading-6 text-gray-900"
                                                passive
                                            >
                                                Default address
                                            </Switch.Label>
                                            <Switch.Description as="span" className="text-sm text-gray-500">
                                                Assign a default address that automatically fills out your address field whenever you create a new donation.
                                            </Switch.Description>
                                        </span>
                                        <Switch
                                            checked={value}
                                            ref={ref}
                                            onChange={onChange}
                                            className={classNames(
                                                value ? "bg-green-500" : "bg-gray-200",
                                                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                            )}
                                        >
                                            <span
                                                aria-hidden="true"
                                                className={classNames(
                                                    value ? "translate-x-5" : "translate-x-0",
                                                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                                                )}
                                            />
                                        </Switch>
                                    </Switch.Group>
                                )}
                            ></Controller>
                        </div>
                        <div className="col-span-full">
                            {isLoaded && watchAddressToggle ? (
                                <div>
                                    <Controller
                                        name="addressField.address"
                                        control={control}
                                        render={({ field: { onChange, name, ref, value } }) => {
                                            return (
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
                                                    errorMessage={errors.addressField?.address?.message}
                                                    ref={ref}
                                                    controllerValue={value}
                                                />
                                            );
                                        }}
                                    />
                                    <div className="w-full h-[400px] mt-6">
                                        <AddressMap>{coordinates && <Marker position={coordinates} />}</AddressMap>
                                    </div>
                                </div>
                            ) : watchAddressToggle ? (
                                <div className="animate-pulse">
                                    <div className="h-6 w-20 bg-gray-200 rounded" />
                                    <div className="h-9 w-full bg-gray-200 rounded mt-2" />
                                    <div className="h-[400px] w-full bg-gray-200 rounded mt-6" />
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
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
        </form>
    );
};

export default ProfileForm;
