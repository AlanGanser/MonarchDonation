'use client'

import styles from '../styles/home.module.css';

import Image from 'next/image';
import Link from 'next/link';

import Hero from './hero';
import About from './aboutSection';
import Partners from './partners';
import Map from './map';

import heroImage from '../public/images/hero-img.png'
import aboutImage from '../public/images/about-img.png'
import { Metadata } from 'next';
import { useRef, useEffect } from 'react';
// nextjs-blog\public\images\hero-img.png

export const metadata: Metadata = {
    title: "Monarch Donations",
    description: "Donation Delivery Service",
};

const Page = () => {

    return (
        <>
            <Hero />
            <About/>
            <Partners />
            <Map height={400}/>
        </>
    )
}

export default Page;