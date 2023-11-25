import Link from "next/link";

const Hero = () => {
    return (
        <div>
            <div
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true"
            >
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#F97316] to-[#FB923C] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                />
            </div>
            <div className="mx-auto max-w-2xl pt-32 pb-16 sm:pb-24 sm:pt-48 lg:pb-32 lg:pt-56">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Send us a message</h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        If you have any questions or would like to get involved in our mission, please don't hesitate to
                        send us a message.
                    </p>
                    <div className="mt-10 flex items-center justify-center">
                        <Link
                            href="#mail"
                            className="rounded-md bg-orange-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 hover:text-white"
                        >
                            Message Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
