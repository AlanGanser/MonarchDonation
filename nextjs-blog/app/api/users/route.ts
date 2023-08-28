import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { User } from "@prisma/client";

export async function POST(request: NextRequest) {
    const { id, firstName, lastName, email, password: inputedPassword }: { id: string; firstName?:string; lastName: string; email: string; password: string } = await request.json();
    const user = await prisma.user.create({
        data: {
            id: id,
            firstName: firstName || "",
            lastName: lastName || "",
            email: email
        },
    });

    return NextResponse.json({ user }, { status: 201 });
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const ids = searchParams.getAll("id");
    let users: User[] = [];
    if (ids.length > 0) {
        users = await prisma.user.findMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });
    } else {
        users = await prisma.user.findMany();
    }
    return NextResponse.json({ users }, { status: 200 });
}
