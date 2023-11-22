import DonationFrom from "../../../../componenets/dashboard/updateDonationForm";
import { startOfToday } from "date-fns";
import prisma from "../../../../lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/types/server";
import CreateDonationForm from "../../../../componenets/dashboard/createDonationForm";

const Page = async () => {
    const today = startOfToday();

    const unavailableDateTimes = await prisma.donation.findMany({
        select: {
            startTime: true,
        },
    });

    const user = (await currentUser()) as User;

    const addressObj = await prisma.user.findUnique({
        where: {
            id: user.id,
        },
        select: {
            defaultAddress: true,
        },
    });


    const address = addressObj?.defaultAddress as string | null;

    return (
        <CreateDonationForm
            userId={user.id}
            userEmail={user.emailAddresses[0].emailAddress}
            defaultAddress={address || ""}
            today={today}
            unavailableDateTimes={unavailableDateTimes?.map((obj) => obj.startTime!) || undefined}
        />
    );
};

export default Page;
