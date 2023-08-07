"use client";

import Hero from "../../componenets/home-hero";

import About from "../../componenets/home-about";
import Partners from "../../componenets/home-partners";
import Map from "../../componenets/map";

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
            <Map height={400} />
        </>
    );
};

export default Page;