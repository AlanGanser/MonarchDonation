"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");

export const NavbarLinks = () => {
    let currentPage = usePathname();
    const navigation = [
        {
            name: "Home",
            href: "/",
            current: currentPage === "/",
        },
        {
            name: "About",
            href: "/about",
            current: currentPage === "/about",
        },
        {
            name: "Contact",
            href: "/contact",
            current: currentPage === "/contact",
        },
    ];
    return (
        <>
            {navigation.map((page) => (
                <Link
                    key={page.name}
                    href={page.href}
                    className={classNames(
                        "text-sm leading-6 text-gray-900",
                        page.current ? "font-bold" : "font-semibold"
                    )}
                >
                    {page.name}
                </Link>
            ))}
        </>
    );
};

export const MobileNavbarLinks = () => {
    let currentPage = usePathname();
    const navigation = [
        {
            name: "Home",
            href: "/",
            current: currentPage === "/",
        },
        {
            name: "About",
            href: "/about",
            current: currentPage === "/about",
        },
        {
            name: "Contact",
            href: "/contact",
            current: currentPage === "/contact",
        },
    ];
    return (
        <>
            {navigation.map((page) => (
                <Link
                    key={page.name}
                    href={page.href}
                    className={classNames(
                        "-mx-3 block rounded-lg px-3 py-2 text-base leading-7 text-gray-900 hover:bg-gray-50",
                        page.current ? "font-bold" : "font-semibold"
                    )}
                >
                    {page.name}
                </Link>
            ))}
        </>
    );
};
