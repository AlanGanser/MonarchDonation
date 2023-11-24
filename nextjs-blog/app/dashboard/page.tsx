import CreateDonationLink from "../../componenets/dashboard/createDonationLink";
import DonationList from "../../componenets/dashboard/donationList";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/types/server";
import prisma from "../../lib/prisma";
import NeededItems from "../../componenets/donations/home/neededItems";

const Page = async () => {
    const user = (await currentUser()) as User;

    const donations = await prisma.donation.findMany({
        where: {
            userId: user.id,
        },
    });

    
    const addressObj = await prisma.user.findUnique({
        where: {
            id: user.id,
        },
        select: {
            defaultAddress: true,
        },
    });

    const donationsWithItems = await Promise.all(
        donations.map(async (donation) => {
            const items = await prisma.item.findMany({
                where: {
                    donationId: donation.id,
                },
            });
            return {
                donation: donation,
                items: items,
            };
        })
    );

    return (
        <>
            <div className="mb-10">
                <CreateDonationLink userId={user.id} address={addressObj?.defaultAddress || ""}  />
            </div>
            <div className="mb-10">
                <NeededItems large={true} />
            </div>
            <div className="mb-10">
                <div className="relative mb-5">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-start">
                        <span className="bg-white pr-3 text-base font-semibold leading-6 text-gray-900">Upcoming Donations</span>
                    </div>
                </div>
                <DonationList donations={donationsWithItems} />
            </div>
        </>
    );
};

export default Page;
