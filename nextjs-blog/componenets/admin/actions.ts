"use server"

import { revalidatePath } from "next/cache";
import prisma from "../../lib/prisma";

export const deleteDonation = async (donationId: string) => {
    await prisma.donation.delete({
        where: {
            id: donationId,
        },
    });
    revalidatePath("/admin/control/calendar");
};