"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { HiPlus, HiXMark } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import Input from "../form/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const DonationTable = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the users in your account including their name, title, email and role.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                        type="button"
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add user
                    </button>
                </div>
            </div>
            <div className="-mx-4 mt-8 sm:-mx-0">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                        <tr>
                            <th
                                scope="col"
                                className="w-full py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0 md:w-1/3"
                            >
                                Name
                            </th>
                            <th
                                scope="col"
                                className="w-1/3 hidden pr-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                            >
                                Type
                            </th>
                            <th scope="col" className="w-1/12 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Quantity
                            </th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0 w-1">
                                <span className="sr-only">Delete</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">{children}</tbody>
                </table>
            </div>
        </div>
    );
};

export default DonationTable;