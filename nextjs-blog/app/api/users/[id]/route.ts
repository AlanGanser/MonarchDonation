import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import { User } from "../../../../models/users";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const { newName: name, newEmail: email, newPassword: password } = await request.json();
    if (mongoose.connection.readyState === 0) await connectMongoDB(); // if already connected, don't make new connection
    await User.findByIdAndUpdate(id, { name, email, password });
    return NextResponse.json({ message: "User Updated" }, { status: 200 });
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    console.log(params)

    const { id } = params;
    if (mongoose.connection.readyState === 0) await connectMongoDB(); // if already connected, don't make new connection
    const user = await User.findOne({ _id: id });
    return NextResponse.json({ user }, { status: 200 });
}
