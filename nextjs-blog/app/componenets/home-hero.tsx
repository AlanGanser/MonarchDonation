import { HiCurrencyDollar, HiCalendarDays, HiGift } from "react-icons/hi2";
import { BsChevronRight } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";

const features = [
    {
        name: "Completely Free.",
        description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
        icon: HiCurrencyDollar,
    },
    {
        name: "Open Schedule.",
        description: "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.",
        icon: HiCalendarDays,
    },
    {
        name: "Help the Migrant Crisis.",
        description: "Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.",
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
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis
                                suscipit eaque, iste dolor cupiditate blanditiis ratione.
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
                                    href="#"
                                    className="rounded-md bg-orange-500  px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 flex justify-center items-center gap-1 hover:-translate-y-1 transition"
                                >
                                    Donate Now
                                    <BsChevronRight aria-hidden="true" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <img /* TODO CHANGE TO IMAGE */
                        src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
                        alt="Image of donations."
                        className="hidden w-[57rem] max-w-none rounded-xl shadow-xl ring-1 -ml-0 ring-gray-400/10 lg:block"
                        width={2432}
                        height={1442}
                    />
                </div>
            </div>
        </div>
    );
};

export default Hero;
