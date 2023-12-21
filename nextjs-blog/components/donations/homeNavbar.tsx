"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, Fragment } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { NavbarLinks, MobileNavbarLinks } from "./navbarLinks";
import { User } from "@clerk/nextjs/dist/types/server";
import { useClerk } from "@clerk/nextjs";

const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");

const Navbar = ({ user }: { user: User | null }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { signOut } = useClerk();

    const userNavigation = [
        {
            name: "Settings",
            href: "#",
        },
        {
            name: "Sign out",
        },
    ];

    return (
        <header>
            <nav
                className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-3 lg:px-8"
                aria-label="Global"
            >
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Monarch Donations</span>
                        <Image
                            height={40}
                            width={40}
                            className="h-10 w-auto"
                            src="/images/monarch-logo.png"
                            alt="Monarch donations logo"
                        />
                    </Link>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    <NavbarLinks />
                </div>
                <div className="flex flex-1 items-center justify-end gap-x-6">
                    {user ? (
                        <>
                            <Link
                                href="/dashboard"
                                className="rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                            >
                                Go to Dashboard
                            </Link>
                            <Menu as="div" className="relative">
                                <div>
                                    <Menu.Button className="relative flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ring-offset-white">
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            className="inline-block h-9 w-9 rounded-full"
                                            src={user?.imageUrl}
                                            alt="Profile image"
                                        />
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        {userNavigation.map((item) => (
                                            <Menu.Item key={item.name}>
                                                {({ active }) =>
                                                    item.name === "Sign out" ? (
                                                        <button
                                                            onClick={() => {
                                                                signOut();
                                                            }}
                                                            className={classNames(
                                                                active ? "bg-gray-100" : "",
                                                                "w-full px-4 py-2 text-sm text-gray-700 text-left"
                                                            )}
                                                        >
                                                            {item.name}
                                                        </button>
                                                    ) : (
                                                        <a
                                                            href={item.href}
                                                            className={classNames(
                                                                active ? "bg-gray-100" : "",
                                                                "block px-4 py-2 text-sm text-gray-700"
                                                            )}
                                                        >
                                                            {item.name}
                                                        </a>
                                                    )
                                                }
                                            </Menu.Item>
                                        ))}
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/sign-in"
                                className="hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-900"
                            >
                                Log in
                            </Link>
                            <Link
                                href="/sign-up"
                                className="rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                            >
                                Sign up
                            </Link>
                        </>
                    )}
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className={"-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"}
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <HiBars3 className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-50" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-3 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between gap-x-6">
                        <Link href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Monarch Donations</span>
                            <Image
                                height={40}
                                width={40}
                                className="h-10 w-auto"
                                src="/images/monarch-logo.png"
                                alt="Monarch donations logo"
                            />
                        </Link>
                        {!user && (

                        <Link
                            href="#"
                            className="ml-auto rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                        >
                            Sign up
                        </Link>
                        
                        )}
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <HiXMark className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root p-6">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <MobileNavbarLinks />
                            </div>

                            {!user && (
                                <div className="py-6">
                                    <Link
                                        href="/sign-in"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        Log in
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    );
};

export default Navbar;
