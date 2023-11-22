import Image from "next/image";

const Partners = () => {
    return (
        <div className="relative py-24 sm:py-32">
            <div className="relative isolate mx-auto max-w-7xl px-6 lg:px-8">
                <svg
                    className="absolute inset-0 -z-10 h-full w-full stroke-gray-500/25 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern
                            id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
                            width={50}
                            height={50}
                            x="50%"
                            y={-1}
                            patternUnits="userSpaceOnUse"
                        >
                            <path d="M.5 200V.5H200" fill="none" />
                        </pattern>
                    </defs>
                    <svg x="50%" y={-1} className="overflow-visible fill-gray-200/50">
                        <path
                            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                            strokeWidth={0}
                        />
                    </svg>
                    <rect
                        width="100%"
                        height="100%"
                        strokeWidth={0}
                        fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
                    />
                </svg>
                <div className="grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
                    <div className="mx-auto w-full max-w-xl lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Our Partner</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            We are currently partnered with Rescue Mission of El Paso as a donation center, one of the
                            largest donation centers in El Paso. We plan to partner up with more donation centers in the
                            future.
                        </p>
                    </div>
                    <div className="mx-auto flex justify-center items-center w-full max-w-xl lg:mx-0 lg:max-w-none">
                        <Image
                            height={158}
                            width={276}
                            className="max-h-64 object-contain object-left"
                            src="/images/rescue-mission.png"
                            alt="Rescue Mission of El Paso logo"
                        />
                    </div>
                    {/* <div className="mx-auto grid w-full max-w-xl grid-cols-2 items-center gap-y-12 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:pl-8">
                        <img
                            className="max-h-12 w-full object-contain object-left"
                            src="https://tailwindui.com/img/logos/reform-logo-gray-900.svg"
                            alt="Reform"
                            width={104}
                            height={48}
                        />
                        <img
                            className="max-h-12 w-full object-contain object-left"
                            src="https://tailwindui.com/img/logos/savvycal-logo-gray-900.svg"
                            alt="SavvyCal"
                            width={140}
                            height={48}
                        />
                        <img
                            className="max-h-12 w-full object-contain object-left"
                            src="https://tailwindui.com/img/logos/laravel-logo-gray-900.svg"
                            alt="Laravel"
                            width={136}
                            height={48}
                        />
                        <img
                            className="max-h-12 w-full object-contain object-left"
                            src="https://tailwindui.com/img/logos/transistor-logo-gray-900.svg"
                            alt="Transistor"
                            width={158}
                            height={48}
                        />
                        <img
                            className="max-h-12 w-full object-contain object-left"
                            src="https://tailwindui.com/img/logos/statamic-logo-gray-900.svg"
                            alt="Statamic"
                            width={147}
                            height={48}
                        />
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Partners;
