import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import { User } from "../../../models/users";
import mongoose from "mongoose";

export async function POST(request: NextRequest) {
    const { firstName, lastName, email, password } = await request.json()
    console.log(firstName, lastName, email, password);
    if (mongoose.connection.readyState === 0) await connectMongoDB(); // if already connected, don't make new connection
    await User.create({ firstName, lastName, email, password });
    return NextResponse.json({ message: "User Created" }, { status: 201 });
}

export async function GET() {
    if (mongoose.connection.readyState === 0) await connectMongoDB();
    const users = await User.find();
    return NextResponse.json({ users });
}

export async function DELETE(request: NextRequest) {
    const id = request.nextUrl.searchParams.get("id");
    if (mongoose.connection.readyState === 0) await connectMongoDB();
    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: "User Deleted" }, { status: 200 });
}
