import React from "react";

import Calendar from "../../../components/dashboard/calendar";
import DonationFrom from "../../../components/dashboard/updateDonationForm";
import { startOfToday } from "date-fns";
import prisma from "../../../lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/types/server";

const Page = async () => {
    //TODO Change later

    const today = startOfToday()

    const UnavailableDateTimes = await prisma.donation.findMany({
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

    const address = addressObj?.defaultAddress as string | null

    return <DonationFrom defaultAddress={address} today={today} UnavailableDateTimes={UnavailableDateTimes?.map((obj) => obj.startTime)} />;
};

export default Page;