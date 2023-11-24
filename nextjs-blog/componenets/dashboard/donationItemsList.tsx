"use client";

import { Disclosure } from "@headlessui/react";
import { Item } from "@prisma/client";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";

const DonationItemsList = ({ items }: { items: Item[] }) => {
    return (
        <Disclosure>
            {({ open }) => (
                <>
                    <div className="flex whitespace-nowrap overflow-hidden items-center space-x-3">
                        <p className="truncate mt-1 text-sm text-gray-500">
                            {items
                                .map(({ name, quantity }) => quantity + " " + name)
                                .join(", ")
                                .replace(/, ([^,]*)$/, " and $1")}
                        </p>
                        <Disclosure.Button className="py-2 flex-grow-0 flex-shrink-0 basis-auto text-gray-400 hover:text-gray-500">
                            {open ? (
                                <HiChevronUp className="h-4 w-4" aria-hidden="true" />
                            ) : (
                                <HiChevronDown className="h-4 w-4" aria-hidden="true" />
                            )}
                        </Disclosure.Button>
                    </div>
                    <Disclosure.Panel className="text-gray-500">
                        Yes! You can purchase a license that you can share with your entire team.
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
};

export default DonationItemsList;
