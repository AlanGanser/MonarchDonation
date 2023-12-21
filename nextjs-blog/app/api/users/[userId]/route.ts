import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function DELETE(request: NextRequest, { params }: { params: { userId: string } }) {
    const { userId } = params;
    const user = await prisma.user.delete({
        where: {
            id: userId,
        },
    });
    return NextResponse.json({ user }, { status: 200 });
}


export async function PUT(request: NextRequest, { params }: { params: { userId: string } }) {
    const { firstName, lastName, email } = await request.json();
    const { userId } = params;
    const user = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            firstName,
            lastName,
            email,
        },
    });

    return NextResponse.json({ user }, { status: 200 });
}
