"use client";

import Hero from "../../components/donations/home/hero";

import About from "../../components/donations/home/about";
import Partners from "../../components/donations/home/partners";
import Map from "../../components/donations/home/map";

// import { Metadata } from 'next'
 
// export const metadata: Metadata = {
//   title: 'Monarch Donations',
// }

const Page = () => {
    return (
        <>
            <Hero />
            <About />
            <Partners />
            <Map />
        </>
    );
};

export default Page;