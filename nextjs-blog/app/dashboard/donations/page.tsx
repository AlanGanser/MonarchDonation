import React from "react";

import DonationFrom from "../../../components/dashboard/createDonationForm";
import { startOfToday } from "date-fns";
import prisma from "../../../lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/types/server";

const Page = async () => {
    //TODO Change later

    const today = startOfToday()

    const unavailableDateTimes = await prisma.donation.findMany({
        select: {
            startTime: true,
        },
    });

    const user = await currentUser() as User;

    const addressObj = await prisma.user.findUnique({
        where: {
            id: user.id,
        },
        select: {
            defaultAddress: true,
        },
    });

    const address = addressObj?.defaultAddress as string

    // userId,
    // userEmail,

    return <DonationFrom userId={user.id} userEmail={user.emailAddresses[0].emailAddress} defaultAddress={address} today={today} unavailableDateTimes={unavailableDateTimes.map((obj) => new Date(obj.startTime!))} />;
};

export default Page;