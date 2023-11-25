import { useState } from "react";
import { Dialog } from "@headlessui/react";
import Image from "next/image";

const navigation = [
    { name: "Product", href: "#" },
    { name: "Features", href: "#" },
    { name: "Marketplace", href: "#" },
    { name: "Company", href: "#" },
];

const Hero = () => {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Our Mission.</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        We strive to provide local migrant shelters with essential resources that will help support the
                        lives of those navigating the challenges of relocation. We operate on a principle of
                        community-driven change: every donation, no matter how modest, can help supply these shelters
                        with much-needed resources to aid struggling migrants.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Hero;
