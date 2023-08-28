import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function PUT(request: NextRequest, { params }: { params: { userId: string } }) {
    const { userId } = params;
    const { firstName, lastName, email, password: inputedPassword }: { firstName: string; lastName: string; email: string; password: string } = await request.json();
    const user = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            firstName: firstName || "",
            lastName: lastName || "",
            email: email,
        },
    });

    return NextResponse.json({ user }, { status: 200 });
}

export async function GET(request: NextRequest, { params }: { params: { userId: string }}) {
    const { userId } = params
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    return NextResponse.json({ user }, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: { params: { userId: string } }) {
    const { userId } = params;
    await prisma.user.delete({
        where: {
            id: userId,
        },
    });
    return NextResponse.json({ message: "User Deleted" }, { status: 200 });
}