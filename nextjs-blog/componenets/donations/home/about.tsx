import Link from "next/link";
import { BsChevronRight } from "react-icons/bs";

const About = () => {
    return (
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
            {/* <div
                className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
                aria-hidden="true"
            >
                <div
                    className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#8fced1] to-[#6278A7] opacity-20"
                    style={{
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                />
            </div>
            <div
                className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
                aria-hidden="true"
            >
                <div
                    className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#8fced1] to-[#6278A7] opacity-20"
                    style={{
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                />
            </div> */}
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">About Us</h2>
                <p className="mt-6 text-lg leading-8 text-gray-300">
                    We are a group of high school students committed to making a difference in our community by
                    providing local migrant shelters with essential resources to ensure that struggling migrants receive
                    the assistance necessary.
                </p>
                <div className="mt-10 flex items-center justify-center">
                    <Link
                        href="/about"
                        className="text-sm font-semibold leading-6 text-gray-300 inline-flex items-center gap-1 hover:text-white"
                    >
                        Learn more
                        <BsChevronRight aria-hidden="true" />
                    </Link>
                </div>
            </div>
            <svg
                viewBox="0 0 1024 1024"
                className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
                aria-hidden="true"
            >
                <circle cx={512} cy={512} r={512} fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)" fillOpacity="0.7" />
                <defs>
                    <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                        <stop stopColor="#7775D6" />
                        <stop offset={1} stopColor="#064E3B" />
                    </radialGradient>
                </defs>
            </svg>
        </div>
    );
};

export default About;
