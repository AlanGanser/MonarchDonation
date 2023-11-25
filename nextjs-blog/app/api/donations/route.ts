import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
    const donations = await prisma.donation.findMany({});
    return NextResponse.json({ donations }, {status: 201});
}