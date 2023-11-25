import { Donation, Item, User } from "@prisma/client";
import ViewDonation from "../../../../components/admin/viewDonation";
import prisma from "../../../../lib/prisma";

const Page = async ({ params }: { params: { donationId: string } })=> {
    const donation = await prisma.donation.findUnique({
        where: {
            id: params.donationId
        }
    })
    const items = await prisma.item.findMany({
        where: {
            donationId: params.donationId
        }
    })
    const user = await prisma.user.findUnique({
        where: {
            id: donation?.userId
        }
    })
    return <ViewDonation donation={donation as Donation} items={items as Item[]} user={user as User}/>;
};

export default Page;
