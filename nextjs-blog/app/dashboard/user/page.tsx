import ProfileForm from "../../../componenets/dashboard/profileForm";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/types/server";
import prisma from "../../../lib/prisma";

const Page = async () => {
    const user = (await currentUser()) as User;

    const addressObj = await prisma.user.findUnique({
        where: {
            id: user.id,
        },
        select: {
            defaultAddress: true,
        },
    });

    const address = addressObj?.defaultAddress as string | null

    return (
        <ProfileForm
            user={user}
            defaultAddress={address}
        />
    );
};

export default Page;
