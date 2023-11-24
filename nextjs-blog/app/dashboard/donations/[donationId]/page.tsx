import UpdateDonationFrom from "../../../../componenets/dashboard/updateDonationForm";
import { startOfToday } from "date-fns";
import prisma from "../../../../lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/types/server";
import { Donation } from "@prisma/client";
import { notFound } from 'next/navigation'; 

const Page = async ({ params }: { params: { donationId: string } }) => {
    const today = startOfToday();

    const unavailableDateTimes = await prisma.donation.findMany({
        select: {
            startTime: true,
        },
    });

    const user = (await currentUser()) as User;

    const donation = await prisma.donation.findUnique({
        where: {
            id: params.donationId
        }
    }) as Donation

    if (donation.userId !== user.id) {
        notFound()
    }

    const items = await prisma.item.findMany({
        where: {
            donationId: donation?.id,
        },
    });

    return (
        <UpdateDonationFrom
            user={user}
            donation={donation}
            items={items}
            today={today}
            unavailableDateTimes={unavailableDateTimes?.map((obj) => obj.startTime!) || undefined}
        />
    );
};

export default Page;
