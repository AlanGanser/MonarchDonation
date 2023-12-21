import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function DELETE(request: NextRequest, { params }: { params: { donationId: string } }) {
    const { donationId } = params;
    await prisma.donation.delete({
        where: {
            id: donationId,
        },
    });
    return NextResponse.json({ message: "Donation Deleted" }, { status: 200 });
}