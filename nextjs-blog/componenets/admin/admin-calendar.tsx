"use client";

import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
    HiXMark,
    HiChevronLeft,
    HiChevronRight,
    HiMapPin,
    HiCalendar,
    HiMiniExclamationTriangle,
} from "react-icons/hi2";

const meetings = [
    {
        id: 1,
        date: "January 10th, 2022",
        time: "5:00 PM",
        datetime: "2022-01-10T17:00",
        name: "Leslie Alexander",
        location: "Starbucks",
    },
    {
        id: 2,
        date: "January 10th, 2022",
        time: "5:00 PM",
        datetime: "2022-01-10T17:00",
        name: "Andrew Alexander",
        location: "Starbucks",
    },
    // More meetings...
];

interface day {
    date: string;
    isCurrentMonth?: boolean;
    isToday?: boolean;
    isSelected?: boolean;
}

const days: day[] = [
    { date: "2021-12-27" },
    { date: "2021-12-28" },
    { date: "2021-12-29" },
    { date: "2021-12-30" },
    { date: "2021-12-31" },
    { date: "2022-01-01", isCurrentMonth: true },
    { date: "2022-01-02", isCurrentMonth: true },
    { date: "2022-01-03", isCurrentMonth: true },
    { date: "2022-01-04", isCurrentMonth: true },
    { date: "2022-01-05", isCurrentMonth: true },
    { date: "2022-01-06", isCurrentMonth: true },
    { date: "2022-01-07", isCurrentMonth: true },
    { date: "2022-01-08", isCurrentMonth: true },
    { date: "2022-01-09", isCurrentMonth: true },
    { date: "2022-01-10", isCurrentMonth: true },
    { date: "2022-01-11", isCurrentMonth: true },
    { date: "2022-01-12", isCurrentMonth: true, isToday: true },
    { date: "2022-01-13", isCurrentMonth: true },
    { date: "2022-01-14", isCurrentMonth: true },
    { date: "2022-01-15", isCurrentMonth: true },
    { date: "2022-01-16", isCurrentMonth: true },
    { date: "2022-01-17", isCurrentMonth: true },
    { date: "2022-01-18", isCurrentMonth: true },
    { date: "2022-01-19", isCurrentMonth: true },
    { date: "2022-01-20", isCurrentMonth: true },
    { date: "2022-01-21", isCurrentMonth: true },
    { date: "2022-01-22", isCurrentMonth: true, isSelected: true },
    { date: "2022-01-23", isCurrentMonth: true },
    { date: "2022-01-24", isCurrentMonth: true },
    { date: "2022-01-25", isCurrentMonth: true },
    { date: "2022-01-26", isCurrentMonth: true },
    { date: "2022-01-27", isCurrentMonth: true },
    { date: "2022-01-28", isCurrentMonth: true },
    { date: "2022-01-29", isCurrentMonth: true },
    { date: "2022-01-30", isCurrentMonth: true },
    { date: "2022-01-31", isCurrentMonth: true },
    { date: "2022-02-01" },
    { date: "2022-02-02" },
    { date: "2022-02-03" },
    { date: "2022-02-04" },
    { date: "2022-02-05" },
    { date: "2022-02-06" },
];

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

// const getDonations = async () => {
//     try {
    
//         const res = await fetch("http") 

//     } catch () {

//     }
// }

export default function Example() {
    const [warningOpen, setWarningOpen] = useState(false);
    const cancelButtonRef = useRef(null);

    return (
        <div>
            <h2 className="text-base font-semibold leading-6 text-gray-900">Upcoming meetings</h2>
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
                <div className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
                    <div className="flex items-center text-gray-900">
                        <button
                            type="button"
                            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                        >
                            <span className="sr-only">Previous month</span>
                            <HiChevronLeft className="h-5 w-5" aria-hidden="true" />
                        </button>
                        <div className="flex-auto text-sm font-semibold">January</div>
                        <button
                            type="button"
                            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                        >
                            <span className="sr-only">Next month</span>
                            <HiChevronRight className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
                        <div>M</div>
                        <div>T</div>
                        <div>W</div>
                        <div>T</div>
                        <div>F</div>
                        <div>S</div>
                        <div>S</div>
                    </div>
                    <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
                        {days.map((day, dayIdx) => (
                            <button
                                key={day.date}
                                type="button"
                                className={classNames(
                                    "py-1.5 hover:bg-gray-100 focus:z-10",
                                    day.isCurrentMonth ? "bg-white" : "bg-gray-50",
                                    (day.isSelected || day.isToday) && "font-semibold",
                                    day.isSelected && "text-white",
                                    !day.isSelected && day.isCurrentMonth && !day.isToday && "text-gray-900",
                                    !day.isSelected && !day.isCurrentMonth && !day.isToday && "text-gray-400",
                                    day.isToday && !day.isSelected && "text-indigo-600",
                                    dayIdx === 0 && "rounded-tl-lg",
                                    dayIdx === 6 && "rounded-tr-lg",
                                    dayIdx === days.length - 7 && "rounded-bl-lg",
                                    dayIdx === days.length - 1 && "rounded-br-lg"
                                )}
                            >
                                <time
                                    dateTime={day.date}
                                    className={classNames(
                                        "mx-auto flex h-7 w-7 items-center justify-center rounded-full",
                                        day.isSelected && day.isToday && "bg-indigo-600",
                                        day.isSelected && !day.isToday && "bg-gray-900"
                                    )}
                                >
                                    {day.date.split("-").pop()?.replace(/^0/, "")}
                                </time>
                            </button>
                        ))}
                    </div>
                </div>
                <ol className="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8">
                    {meetings.map((meeting) => (
                        <li key={meeting.id} className="relative flex space-x-6 py-6 xl:static">
                            {/* <img src={meeting.imageUrl} alt="" className="h-14 w-14 flex-none rounded-full" /> */}
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                {meeting.name.charAt(0)}
                            </span>
                            <div className="flex-auto">
                                <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">{meeting.name}</h3>
                                <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row">
                                    <div className="flex items-start space-x-3">
                                        <dt className="mt-0.5">
                                            <span className="sr-only">Date</span>
                                            <HiCalendar className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </dt>
                                        <dd>
                                            <time dateTime={meeting.datetime}>
                                                {meeting.date} at {meeting.time}
                                            </time>
                                        </dd>
                                    </div>
                                    <div className="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                                        <dt className="mt-0.5">
                                            <span className="sr-only">Location</span>
                                            <HiMapPin className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </dt>
                                        <dd>{meeting.location}</dd>
                                    </div>
                                </dl>
                            </div>
                            <div className="absolute right-0 top-6 xl:relative xl:right-auto xl:top-auto xl:self-center">
                                <button
                                    className="-m-2 flex items-center rounded-full p-2 text-red-600"
                                    onClick={() => setWarningOpen(true)}
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
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setWarningOpen}>
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
                                            onClick={() => setWarningOpen(false)} /* TODO */
                                        >
                                            Deactivate
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setWarningOpen(false)}
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
        </div>
    );
}
