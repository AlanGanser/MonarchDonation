import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, RefObject, useCallback } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import { Dialog } from "@headlessui/react";
import { HiBars3, HiXMark } from "react-icons/hi2";

interface Page {
    name: string;
    href: string;
    secondSectionID: string;
}

const navigation: Page[] = [
    {
        name: "Home",
        href: "/",
        secondSectionID: "about-section",
    },
    {
        name: "Schedule Donation",
        href: "/schedule-donation",
        secondSectionID: "about-section",
    },
    {
        name: "About",
        href: "/about",
        secondSectionID: "team",
    },
    {
        name: "Contact",
        href: "/contact",
        secondSectionID: "faq",
    },
];

//const Map = ({ height }: { height: number | string }) => {
//, navRef?, navStyle
const Navbar = (props: { currentPage: Page; navRef?: RefObject<HTMLElement>; navStyle?: string }) => {
    const { currentPage, navRef, navStyle } = props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header ref={navRef} className={"transition-all inset-x-0 duration-300 z-40 " + (navStyle || "absolute top-0")}>
            <nav
                className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-3 lg:px-8"
                aria-label="Global"
            >
                <div className="flex lg:flex-1">
                    <Link href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Monarch Donations</span>
                        <Image
                            height={100}
                            width={100}
                            className="h-8 w-auto"
                            src="/../public/images/test-logo.png"
                            alt=""
                        />
                    </Link>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((page) => {
                        let activeStyles = "";
                        let inactiveStyles = "";
                        if (page === currentPage) {
                            activeStyles = " font-bold";
                        } else {
                            inactiveStyles = " font-semibold";
                        }
                        return (
                            <Link
                                key={page.name}
                                href={page.href}
                                className={"text-sm leading-6 text-gray-900" + activeStyles + inactiveStyles}
                            >
                                {page.name}
                            </Link>
                        );
                    })}
                </div>
                <div className="flex flex-1 items-center justify-end gap-x-6">
                    <Link
                        href="#"
                        className="hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-900"
                    >
                        Log in
                    </Link>
                    <Link
                        href="#"
                        className="rounded-md bg-primary-300 px-3 py-2 text-sm font-semibold text-grey-900 shadow-sm hover:bg-secondary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300 transition"
                    >
                        Sign up
                    </Link>
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
                    <div className="flex items-center gap-x-6">
                        <Link href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Monarch Donations</span>
                            <Image
                                height={100}
                                width={100}
                                className="h-8 w-auto"
                                src="/../public/images/test-logo.png"
                                alt=""
                            />
                        </Link>
                        <Link
                            href="#"
                            className="ml-auto rounded-md bg-primary-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-secondary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300 transition"
                        >
                            Sign up
                        </Link>
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
                                {navigation.map((page) => {
                                    let activeStyles = "";
                                    let inactiveStyles = "";
                                    if (page === currentPage) {
                                        activeStyles = " font-bold";
                                    } else {
                                        inactiveStyles = " font-semibold";
                                    }
                                    return (
                                        <Link
                                            key={page.name}
                                            href={page.href}
                                            className={
                                                "-mx-3 block rounded-lg px-3 py-2 text-base leading-7 text-gray-900 hover:bg-gray-50" +
                                                activeStyles +
                                                inactiveStyles
                                            }
                                        >
                                            {page.name}
                                        </Link>
                                    );
                                })}
                            </div>
                            <div className="py-6">
                                <Link
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Log in
                                </Link>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    );
};

const NavbarWrapper = () => {
    // runs once
    const navRef = useRef<HTMLElement>(null);
    const navStyles = {
        hidden: "hidden",
        stick: "fixed inset-x-0 top-0 bg-white",
        stickhidden: `fixed inset-x-0 -top-[60px] bg-white`, // randomly causing errors when plugins are updated //${navRef.current?.offsetHeight || 60}
    };

    const [navDisplay, setNavDisplay] = useState<string>(navStyles.stickhidden);

    const [previousScrollPosition, setPreviousScrollPosition] = useState<number>(window.scrollY);

    let currentPage: Page = navigation[0];
    for (let i = 0; i < navigation.length; i++) {
        if (useSelectedLayoutSegment() === (navigation[i].href.slice(1) || null)) {
            currentPage = navigation[i];
        }
    }

    const updateNavDisplay = useCallback(() => {
        let newNavDisplay = "";
        let secondSection = document.getElementById(currentPage.secondSectionID) as HTMLElement;

        if (secondSection == null) {
            newNavDisplay = navStyles.hidden;
        } else if (secondSection.getBoundingClientRect().top <= 0) {
            // if below second section
            if (window.innerWidth < 768) {
                // small display
                if (window.scrollY > previousScrollPosition) {
                    // scroll down
                    newNavDisplay = navStyles.stickhidden;
                } else {
                    // scroll up
                    newNavDisplay = navStyles.stick;
                }
            } else {
                newNavDisplay = navStyles.stick;
            }
        } else if (secondSection.getBoundingClientRect().top > 0) {
            newNavDisplay = navStyles.stickhidden;
        }

        setNavDisplay(newNavDisplay);
        setPreviousScrollPosition(window.scrollY);
    }, [previousScrollPosition]);

    useEffect(() => {
        // runs every time the window is scrolled
        window.addEventListener("resize", updateNavDisplay);
        window.addEventListener("scroll", updateNavDisplay);
        return () => {
            window.removeEventListener("resize", updateNavDisplay);
            window.removeEventListener("scroll", updateNavDisplay);
        };
    }, [previousScrollPosition, updateNavDisplay]);

    return (
        // relodes when state changes
        <>
            {(navDisplay === navStyles.hidden || navDisplay === navStyles.stickhidden) && <Navbar currentPage={currentPage} />}
            <Navbar currentPage={currentPage} navRef={navRef} navStyle={navDisplay} />
        </>
    );
};

export default NavbarWrapper;
