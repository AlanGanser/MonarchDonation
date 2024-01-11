import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";

export async function GET(request: NextRequest, { params }: { params: { donationId: string } }) {
    const { donationId } = params;
    const userDonation = await prisma.donation.findUnique({
        where: {
            id: donationId,
        },
    });
    return NextResponse.json({ message: userDonation }, { status: 200 });
}

export async function PUT(request: NextRequest, { params }: { params: { donationId: string } }) {
    const { donationId } = params;
    const { address, date }: { address: string; date: string } = await request.json();
    await prisma.donation.update({
        where: {
            id: donationId,
        },
        data: {
            address: address,
            date: date,
        },
    });
    return NextResponse.json({ message: "Donation Updated" }, { status: 201 });
}
