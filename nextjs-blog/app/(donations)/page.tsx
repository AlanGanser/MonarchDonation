"use client";

import Hero from "../../componenets/donations/home/hero";

import About from "../../componenets/donations/home/about";
import Partners from "../../componenets/donations/home/partners";
import Map from "../../componenets/donations/home/map";

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