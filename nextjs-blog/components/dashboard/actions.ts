"use server";

import { revalidatePath } from "next/cache";
import { clerkClient } from "@clerk/nextjs/server";
import prisma from "../../lib/prisma";
import { add, addMinutes, startOfDay } from "date-fns";

export const revalidate = async () => {
    revalidatePath("/dashboard/user");
};

export const updateUser = async (
    userId: string,
    {
        address,
        firstName,
        lastName,
    }: {
        address: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
    }
) => {
    try {
        await clerkClient.users.updateUser(userId, { firstName: firstName, lastName: lastName });
        await prisma.user.update({
            where: {
                id:  userId,
            },
            data: {
                defaultAddress: address,
            },
        });
    } catch (err) {
        throw err;
    }
    revalidatePath("/dashboard/user");
};

type ItemSchema = {
    catagory: "Clothing" | "Food" | "Hygiene" | "Home supplies" | "Other";
    name: string;
    quantity: number;
    id?: string | undefined;
};

export const updateDonation = async (donationId: string, address: string, startTime: Date, items: ItemSchema[]) => {
    try {
        await prisma.donation.update({
            where: {
                id: donationId,
            },
            data: {
                address: address,
                date: startOfDay(startTime).toISOString(),
                startTime: startTime.toISOString(),
                endTime: addMinutes(startTime, 30).toISOString(),
            },
        });

        await prisma.item.deleteMany({
            where: {
                donationId: donationId,
            },
        });

        await prisma.item.createMany({
            data: items.map((item) => {
                return { donationId: donationId, ...item };
            }),
        });
    } catch (err) {
        throw err;
    }
    revalidatePath("/dashboard");
};

export const createDonation = async (userId: string, address: string, startTime: Date, items: ItemSchema[]) => {
    try {
        const donation = await prisma.donation.create({
            data: {
                userId: userId,
                address: address,
                date: startOfDay(startTime).toISOString(),
                startTime: startTime.toISOString(),
                endTime: addMinutes(startTime, 30).toISOString(),
            },
        });
        await prisma.item.createMany({
            data: items.map((item) => {
                return { donationId: donation.id, ...item };
            }),
        });
    } catch (err) {
        throw err;
    }
    revalidatePath("/dashboard");
};

export const deleteDonation = async (donationId: string) => {
    await prisma.donation.delete({
        where: {
            id: donationId,
        },
    });
    revalidatePath("/dashboard");
};

//// Donation
// id: string;
// address: string;
// date: Date;
// startTime: Date;
// endTime: Date;
// createdAt: Date;
// updatedAt: Date;
// userId: string;

//// Item
// id         String   @id @unique @default(cuid())
///name       String
///catagory   String
///quantity   Int
// donation   Donation @relation(fields: [donationId], references: [id], onDelete: Cascade)
// donationId String
