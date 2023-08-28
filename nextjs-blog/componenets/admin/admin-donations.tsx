"use client";

import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { UserDonation } from "./admin-calendar";
import { HiXMark, HiMapPin, HiCalendar, HiMiniExclamationTriangle } from "react-icons/hi2";
import useSWR, { Fetcher } from "swr";
import { useRouter } from 'next/navigation'
// Don't need swr now

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const deleteDonation = async (donationId: string): Promise<{ message: string }> => {
    const res = await fetch(`http://localhost:3000/api/donations/${donationId}`, {
        method: "DELETE",
    });
    return res.json();
};

const Donations = ({ userDonations }: { userDonations: UserDonation[] }) => {
    const [warningOpen, setWarningOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState<string>("");
    const cancelButtonRef = useRef(null);
    const router = useRouter()

    return (
        <>
            <div>
                <ol className="divide-y divide-gray-100 text-sm leading-6">
                    {userDonations.map(({ donation, user }) => (
                        <li key={donation.id} className="relative flex space-x-6 py-6 xl:static">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                {user.name?.charAt(0)}
                            </span>
                            <div className="flex-auto">
                                <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">{user.name}</h3>
                                <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row">
                                    <div className="flex items-start space-x-3">
                                        <dt className="mt-0.5">
                                            <span className="sr-only">Date</span>
                                            <HiCalendar className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </dt>
                                        <dd>
                                            <time>{`${
                                                monthNames[new Date(userDonations[0].donation.date).getMonth()]
                                            } ${new Date(userDonations[0].donation.date).getDate()}, ${new Date(
                                                userDonations[0].donation.date
                                            ).getFullYear()} `}</time>
                                        </dd>
                                    </div>
                                    <div className="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                                        <dt className="mt-0.5">
                                            <span className="sr-only">Location</span>
                                            <HiMapPin className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </dt>
                                        <dd>{donation.address}</dd>
                                    </div>
                                </dl>
                            </div>
                            <div className="absolute right-0 top-6 xl:relative xl:right-auto xl:top-auto xl:self-center">
                                <button
                                    className="-m-2 flex items-center rounded-full p-2 text-red-600"
                                    onClick={() => {
                                        setWarningOpen(true);
                                        setIdToDelete(donation.id);
                                    }}
                                >
                                    <span className="sr-only">Open options</span>
                                    <HiXMark className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
            <Transition.Root show={warningOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    initialFocus={cancelButtonRef}
                    onClose={() => {
                        setWarningOpen(false);
                    }}
                >
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
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <HiMiniExclamationTriangle
                                                className="h-6 w-6 text-red-600"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-base font-semibold leading-6 text-gray-900"
                                            >
                                                Deactivate donation
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Are you sure you want to deactivate this donation? All of the data
                                                    will be permanently removed from our servers forever. This action
                                                    cannot be undone.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                            onClick={async () => {
                                                await deleteDonation(idToDelete);
                                                setWarningOpen(false);
                                                router.refresh()
                                            }}
                                        >
                                            Deactivate
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => {
                                                setWarningOpen(false);
                                            }}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
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

export default Donations;
