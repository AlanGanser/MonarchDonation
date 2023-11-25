import NeededItems from "./neededItems";
import { HiCurrencyDollar, HiCalendarDays, HiGift } from "react-icons/hi2";
import { BsChevronRight } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";

const features = [
    {
        name: "Completely Free.",
        description: "Schedule your donation pick-up entirely free of cost.",
        icon: HiCurrencyDollar,
    },
    {
        name: "Open Schedule.",
        description: "Make your donation online at any time during the weekend.",
        icon: HiCalendarDays,
    },
    {
        name: "Help the Migrant Crisis.",
        description: "Help meet the needs of migrants who require assistance amidst the ongoing border crisis.",
        icon: HiGift,
    },
];

const Hero = () => {
    return (
        <div className="overflow-hidden py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div
                        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                        aria-hidden="true"
                    >
                        <div
                            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#FF8652] to-[#FD841F] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath:
                                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                            }}
                        />
                    </div>
                    <div className="lg:pr-8 lg:pt-4">
                        <div className="lg:max-w-lg">
                            <h2 className="text-base font-semibold leading-7 text-orange-400">Donate With</h2>
                            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                                Monarch Donations
                            </p>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                We are a donation pickup service that makes it easy for you to donate from the comfort
                                of your home.
                            </p>
                            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                {features.map((feature) => (
                                    <div key={feature.name} className="relative pl-9">
                                        <dt className="inline font-semibold text-gray-900">
                                            <feature.icon
                                                className={"absolute left-1 top-1 h-5 w-5 text-orange-400"}
                                                aria-hidden="true"
                                            />
                                            {feature.name}
                                        </dt>{" "}
                                        <dd className="inline">{feature.description}</dd>
                                    </div>
                                ))}
                            </dl>
                            <div className="mt-10">
                                <Link
                                    href="/dashboard/donations/create"
                                    className="rounded-md bg-orange-500  px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 flex justify-center items-center gap-1 transition"
                                >
                                    Donate Now
                                    <BsChevronRight aria-hidden="true" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <NeededItems large={false}/>
                </div>
            </div>
        </div>
    );
};

export default Hero;
