import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
    const { userId } = params;
    const userDonations = await prisma.donation.findMany({
        where: {
            userId: userId,
        },
    });

    return NextResponse.json({ userDonations }, { status: 200 });
}


export async function POST(request: NextRequest, { params }: { params: { userId: string } }) {
    const { userId } = params;
    const { address, date }: { address: string; date: string } = await request.json();

    const donation = await prisma.donation.create({
        data: {
            address: address,
            date: date,
            user: {
                connect: {
                    id: userId,
                },
            },
        },
    });
    return NextResponse.json({ donation }, { status: 201 });
}